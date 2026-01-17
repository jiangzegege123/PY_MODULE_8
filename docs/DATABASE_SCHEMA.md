# 数据库表结构设计文档

> **项目名称**: HealthFirst Medical Centre - Customer App  
> **最后更新**: 2026-01-12  
> **数据库类型**: PostgreSQL / MySQL

---

## 📋 目录

1. [用户相关表](#用户相关表)
2. [医生相关表](#医生相关表)
3. [预约相关表](#预约相关表)
4. [账单相关表](#账单相关表)
5. [诊所信息表](#诊所信息表)
6. [索引设计](#索引设计)
7. [ER图说明](#er图说明)

---

## 用户相关表

### 1. Users (用户表)

用于存储患者的基本信息和医疗相关信息。

```sql
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  phone VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  full_name VARCHAR(100) NOT NULL,
  gender ENUM('Male', 'Female', 'Other') NOT NULL,
  date_of_birth DATE NOT NULL,
  address VARCHAR(255),
  
  -- Medicare信息
  medicare_number VARCHAR(12),              -- 格式: XXXX-XXXXX-X
  medicare_irn INT,                         -- Individual Reference Number
  medicare_expiry DATE,                     -- Medicare卡到期日期
  
  -- 保险信息
  private_insurance VARCHAR(100),           -- 私人保险公司名称
  
  -- 紧急联系人
  emergency_contact_name VARCHAR(100),
  emergency_contact_phone VARCHAR(20),
  
  -- 时间戳
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_phone (phone),
  INDEX idx_email (email)
);
```

**字段说明**:
- `medicare_number`: 澳大利亚Medicare卡号（显示时需脱敏）
- `medicare_irn`: Medicare个人参考号码（1-9）
- `gender`: 性别选项符合隐私法要求

---

### 2. Notification Preferences (通知偏好表)

管理用户的通知偏好设置。

```sql
CREATE TABLE notification_preferences (
  user_id VARCHAR(36) PRIMARY KEY,
  push_enabled BOOLEAN NOT NULL DEFAULT true,
  sms_enabled BOOLEAN NOT NULL DEFAULT true,
  email_enabled BOOLEAN NOT NULL DEFAULT true,
  marketing_enabled BOOLEAN NOT NULL DEFAULT false,
  reminder_hours_before JSON NOT NULL DEFAULT '[24, 2]',  -- 提前提醒时间（小时）
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

**字段说明**:
- `reminder_hours_before`: JSON数组，如 `[24, 2]` 表示预约前24小时和2小时发送提醒

---

## 医生相关表

### 3. Doctors (医生表)

存储医生信息和资质。

```sql
CREATE TABLE doctors (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  title VARCHAR(100) NOT NULL,              -- 如: General Practitioner, Specialist
  specialty VARCHAR(100) NOT NULL,          -- 专长: Family Medicine, Dermatology等
  bio TEXT NOT NULL,                        -- 医生简介
  photo_url VARCHAR(500) NOT NULL,          -- 头像URL
  languages JSON NOT NULL,                  -- 语言: ["English", "Mandarin"]
  qualifications JSON NOT NULL,             -- 资质: ["MBBS", "FRACGP"]
  available_days JSON NOT NULL,             -- 可预约日期: ["Monday", "Tuesday", ...]
  is_active BOOLEAN NOT NULL DEFAULT true,  -- 是否在职
  
  INDEX idx_specialty (specialty),
  INDEX idx_is_active (is_active)
);
```

**字段说明**:
- `qualifications`: 澳大利亚医疗资质缩写（MBBS=医学学士，FRACGP=全科医生院士）
- `available_days`: 医生可工作的星期几

---

## 预约相关表

### 4. Appointments (预约表)

记录所有预约信息。

```sql
CREATE TABLE appointments (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  doctor_id VARCHAR(36) NOT NULL,
  service_type ENUM('GP Consultation', 'Skin Specialist') NOT NULL,
  appointment_date DATE NOT NULL,
  start_time TIME NOT NULL,                 -- 格式: 'HH:mm'
  end_time TIME NOT NULL,                   -- 格式: 'HH:mm'
  status ENUM('Pending', 'Confirmed', 'Completed', 'Cancelled', 'NoShow') NOT NULL DEFAULT 'Pending',
  reason TEXT,                              -- 就诊原因
  is_first_visit BOOLEAN NOT NULL DEFAULT false,
  notes TEXT,                               -- 医生备注
  
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE RESTRICT,
  
  INDEX idx_user_id (user_id),
  INDEX idx_doctor_id (doctor_id),
  INDEX idx_appointment_date (appointment_date),
  INDEX idx_status (status),
  INDEX idx_date_time (appointment_date, start_time)
);
```

**状态流转**:
```
Pending → Confirmed → Completed
         ↓           ↓
      Cancelled   NoShow
```

---

### 5. Time Slots (时间段表)

管理医生的可预约时间段。

```sql
CREATE TABLE time_slots (
  id VARCHAR(36) PRIMARY KEY,
  doctor_id VARCHAR(36) NOT NULL,
  date DATE NOT NULL,                       -- 日期: 'YYYY-MM-DD'
  start_time TIME NOT NULL,                 -- 开始时间: 'HH:mm'
  end_time TIME NOT NULL,                   -- 结束时间: 'HH:mm'
  is_available BOOLEAN NOT NULL DEFAULT true,
  appointment_id VARCHAR(36),               -- 关联的预约ID（如已被预约）
  
  FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
  FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE SET NULL,
  
  INDEX idx_doctor_date (doctor_id, date),
  INDEX idx_available (is_available),
  UNIQUE KEY unique_slot (doctor_id, date, start_time)
);
```

**使用说明**:
- 每个时间段默认15分钟
- `is_available=false` 表示该时段已被预约或医生不可用
- 午餐时间（12:00-13:00）不生成时间段

---

## 账单相关表

### 6. Invoices (账单表)

记录就诊账单信息。

```sql
CREATE TABLE invoices (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  appointment_id VARCHAR(36) NOT NULL,
  invoice_number VARCHAR(50) NOT NULL UNIQUE,  -- 如: 'INV-2026-001'
  total_amount DECIMAL(10,2) NOT NULL,         -- 总金额
  medicare_rebate DECIMAL(10,2) NOT NULL,      -- Medicare退款金额
  patient_payment DECIMAL(10,2) NOT NULL,      -- 患者实付金额
  status ENUM('Pending', 'Paid', 'Processing') NOT NULL DEFAULT 'Pending',
  
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  paid_at TIMESTAMP,                           -- 支付时间
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE RESTRICT,
  
  INDEX idx_user_id (user_id),
  INDEX idx_invoice_number (invoice_number),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
);
```

**计费逻辑**:
- `total_amount`: 服务原价
- `medicare_rebate`: Medicare可退款金额
- `patient_payment = total_amount - medicare_rebate` (非批量结算)
- `patient_payment = 0` (批量结算 Bulk Billing)

---

### 7. Invoice Items (账单明细表)

记录账单中的具体服务项目。

```sql
CREATE TABLE invoice_items (
  id VARCHAR(36) PRIMARY KEY,
  invoice_id VARCHAR(36) NOT NULL,
  description VARCHAR(255) NOT NULL,           -- 服务描述
  item_code VARCHAR(10) NOT NULL,              -- Medicare项目代码（MBS Item Number）
  amount DECIMAL(10,2) NOT NULL,               -- 项目金额
  medicare_rebate DECIMAL(10,2) NOT NULL,      -- 该项目的Medicare退款
  
  FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE,
  
  INDEX idx_invoice_id (invoice_id)
);
```

**常用MBS项目代码**:
- `23`: 标准全科医生咨询（<20分钟）
- `36`: 长时间咨询（20-40分钟）
- `701`: 45岁以上健康评估

---

## 诊所信息表

### 8. Clinic Info (诊所基本信息表)

存储诊所的基本信息（单例表）。

```sql
CREATE TABLE clinic_info (
  id INT PRIMARY KEY DEFAULT 1,
  name VARCHAR(200) NOT NULL,
  address VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL,
  
  CONSTRAINT single_clinic CHECK (id = 1)     -- 确保只有一条记录
);
```

---

### 9. Opening Hours (营业时间表)

记录诊所每周的营业时间。

```sql
CREATE TABLE opening_hours (
  id INT PRIMARY KEY AUTO_INCREMENT,
  clinic_id INT NOT NULL DEFAULT 1,
  day ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
  open_time TIME,                              -- 营业开始时间
  close_time TIME,                             -- 营业结束时间
  is_closed BOOLEAN NOT NULL DEFAULT false,    -- 是否休息
  
  FOREIGN KEY (clinic_id) REFERENCES clinic_info(id) ON DELETE CASCADE,
  UNIQUE KEY unique_day (clinic_id, day)
);
```

**初始数据示例**:
```sql
INSERT INTO opening_hours (clinic_id, day, open_time, close_time, is_closed) VALUES
(1, 'Monday', '08:00', '18:00', false),
(1, 'Tuesday', '08:00', '18:00', false),
(1, 'Wednesday', '08:00', '18:00', false),
(1, 'Thursday', '08:00', '20:00', false),
(1, 'Friday', '08:00', '18:00', false),
(1, 'Saturday', '09:00', '13:00', false),
(1, 'Sunday', NULL, NULL, true);
```

---

### 10. Emergency Contacts (紧急联系方式表)

存储紧急服务联系方式。

```sql
CREATE TABLE emergency_contacts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  clinic_id INT NOT NULL DEFAULT 1,
  name VARCHAR(100) NOT NULL,
  number VARCHAR(20) NOT NULL,
  description VARCHAR(255) NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  
  FOREIGN KEY (clinic_id) REFERENCES clinic_info(id) ON DELETE CASCADE,
  INDEX idx_display_order (display_order)
);
```

**初始数据示例**:
```sql
INSERT INTO emergency_contacts (clinic_id, name, number, description, display_order) VALUES
(1, 'Emergency Services', '000', 'Police, Fire, Ambulance', 1),
(1, 'Healthdirect', '1800 022 222', '24/7 health advice', 2),
(1, 'Lifeline', '13 11 14', '24/7 crisis support', 3),
(1, 'Beyond Blue', '1300 22 4636', 'Mental health support', 4);
```

---

## 索引设计

### 关键索引说明

```sql
-- ============================================
-- Appointments 表索引（高频查询）
-- ============================================
CREATE INDEX idx_appointments_user_id ON appointments(user_id);
CREATE INDEX idx_appointments_doctor_id ON appointments(doctor_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_user_date ON appointments(user_id, appointment_date);

-- ============================================
-- Time Slots 表索引（预约系统核心）
-- ============================================
CREATE INDEX idx_timeslots_doctor_date ON time_slots(doctor_id, date);
CREATE INDEX idx_timeslots_available ON time_slots(is_available);
CREATE UNIQUE INDEX idx_timeslots_unique ON time_slots(doctor_id, date, start_time);

-- ============================================
-- Invoices 表索引
-- ============================================
CREATE INDEX idx_invoices_user_id ON invoices(user_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE UNIQUE INDEX idx_invoices_number ON invoices(invoice_number);
CREATE INDEX idx_invoices_created_at ON invoices(created_at DESC);

-- ============================================
-- Users 表索引
-- ============================================
CREATE UNIQUE INDEX idx_users_phone ON users(phone);
CREATE UNIQUE INDEX idx_users_email ON users(email);
```

---

## ER图说明

### 表关系图

```
┌──────────────┐
│    Users     │
│              │
│  - id (PK)   │
│  - phone     │
│  - email     │
│  - medicare  │
└──────┬───────┘
       │
       │ 1:1
       │
┌──────▼────────────────────┐
│ Notification Preferences  │
│                           │
│  - user_id (PK, FK)       │
└───────────────────────────┘

┌──────────────┐
│    Users     │──────┐
└──────┬───────┘      │
       │              │
       │ 1:N          │ 1:N
       │              │
┌──────▼───────┐      │         ┌──────────────┐
│ Appointments │      │         │   Doctors    │
│              │      │         │              │
│  - id (PK)   │      │         │  - id (PK)   │
│  - user_id   │      │         │  - name      │
│  - doctor_id │◄─────┼─────────┤  - specialty │
└──────┬───────┘      │         └──────┬───────┘
       │              │                │
       │ 1:1          │                │ 1:N
       │              │                │
┌──────▼───────┐      │         ┌──────▼────────┐
│   Invoices   │      │         │  Time Slots   │
│              │      │         │               │
│  - id (PK)   │      │         │  - id (PK)    │
│  - user_id   │◄─────┘         │  - doctor_id  │
│  - appt_id   │                │  - date/time  │
└──────┬───────┘                └───────────────┘
       │
       │ 1:N
       │
┌──────▼──────────┐
│ Invoice Items   │
│                 │
│  - id (PK)      │
│  - invoice_id   │
└─────────────────┘
```

---

## 数据类型说明

### 澳大利亚特定字段

| 字段 | 格式 | 示例 | 说明 |
|------|------|------|------|
| `medicare_number` | XXXX-XXXXX-X | 2950-12345-1 | 10位数字 + 1位校验码 |
| `medicare_irn` | 1-9 | 1 | 卡片上同一Medicare号的个人编号 |
| `phone` | +61-X-XXXX-XXXX | +61-2-9123-4567 | 澳大利亚电话格式 |
| `invoice_number` | INV-YYYY-NNN | INV-2026-001 | 年份 + 流水号 |
| `item_code` | MBS代码 | 23, 36, 701 | Medicare Benefits Schedule |

---

## 安全与隐私

### 数据脱敏规则

```javascript
// Medicare号码脱敏
medicare_number: "2950-12345-1" → "XXXX-XXXXX-1"

// 电话号码脱敏（日志）
phone: "+61-2-9123-4567" → "+61-2-XXXX-4567"

// 邮箱脱敏
email: "john.doe@email.com" → "j***e@email.com"
```

### 数据加密要求

- ✅ 传输层: HTTPS/TLS 1.3
- ✅ 存储层: 敏感字段加密（AES-256）
- ✅ 备份: 加密备份文件
- ✅ 日志: 不记录敏感信息明文

### 符合法规

- **Australian Privacy Act 1988**
- **My Health Records Act 2012**
- **GDPR (如适用)**

---

## 初始化脚本

### 完整建表脚本

```sql
-- ============================================
-- 1. 用户相关表
-- ============================================

CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  phone VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  full_name VARCHAR(100) NOT NULL,
  gender ENUM('Male', 'Female', 'Other') NOT NULL,
  date_of_birth DATE NOT NULL,
  address VARCHAR(255),
  medicare_number VARCHAR(12),
  medicare_irn INT,
  medicare_expiry DATE,
  private_insurance VARCHAR(100),
  emergency_contact_name VARCHAR(100),
  emergency_contact_phone VARCHAR(20),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE notification_preferences (
  user_id VARCHAR(36) PRIMARY KEY,
  push_enabled BOOLEAN NOT NULL DEFAULT true,
  sms_enabled BOOLEAN NOT NULL DEFAULT true,
  email_enabled BOOLEAN NOT NULL DEFAULT true,
  marketing_enabled BOOLEAN NOT NULL DEFAULT false,
  reminder_hours_before JSON NOT NULL DEFAULT '[24, 2]',
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================
-- 2. 医生相关表
-- ============================================

CREATE TABLE doctors (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  title VARCHAR(100) NOT NULL,
  specialty VARCHAR(100) NOT NULL,
  bio TEXT NOT NULL,
  photo_url VARCHAR(500) NOT NULL,
  languages JSON NOT NULL,
  qualifications JSON NOT NULL,
  available_days JSON NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- ============================================
-- 3. 预约相关表
-- ============================================

CREATE TABLE appointments (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  doctor_id VARCHAR(36) NOT NULL,
  service_type ENUM('GP Consultation', 'Skin Specialist') NOT NULL,
  appointment_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status ENUM('Pending', 'Confirmed', 'Completed', 'Cancelled', 'NoShow') NOT NULL DEFAULT 'Pending',
  reason TEXT,
  is_first_visit BOOLEAN NOT NULL DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE RESTRICT
);

CREATE TABLE time_slots (
  id VARCHAR(36) PRIMARY KEY,
  doctor_id VARCHAR(36) NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT true,
  appointment_id VARCHAR(36),
  FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
  FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE SET NULL,
  UNIQUE KEY unique_slot (doctor_id, date, start_time)
);

-- ============================================
-- 4. 账单相关表
-- ============================================

CREATE TABLE invoices (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  appointment_id VARCHAR(36) NOT NULL,
  invoice_number VARCHAR(50) NOT NULL UNIQUE,
  total_amount DECIMAL(10,2) NOT NULL,
  medicare_rebate DECIMAL(10,2) NOT NULL,
  patient_payment DECIMAL(10,2) NOT NULL,
  status ENUM('Pending', 'Paid', 'Processing') NOT NULL DEFAULT 'Pending',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  paid_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE RESTRICT
);

CREATE TABLE invoice_items (
  id VARCHAR(36) PRIMARY KEY,
  invoice_id VARCHAR(36) NOT NULL,
  description VARCHAR(255) NOT NULL,
  item_code VARCHAR(10) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  medicare_rebate DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (invoice_id) REFERENCES invoices(id) ON DELETE CASCADE
);

-- ============================================
-- 5. 诊所信息表
-- ============================================

CREATE TABLE clinic_info (
  id INT PRIMARY KEY DEFAULT 1,
  name VARCHAR(200) NOT NULL,
  address VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL,
  CONSTRAINT single_clinic CHECK (id = 1)
);

CREATE TABLE opening_hours (
  id INT PRIMARY KEY AUTO_INCREMENT,
  clinic_id INT NOT NULL DEFAULT 1,
  day ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
  open_time TIME,
  close_time TIME,
  is_closed BOOLEAN NOT NULL DEFAULT false,
  FOREIGN KEY (clinic_id) REFERENCES clinic_info(id) ON DELETE CASCADE,
  UNIQUE KEY unique_day (clinic_id, day)
);

CREATE TABLE emergency_contacts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  clinic_id INT NOT NULL DEFAULT 1,
  name VARCHAR(100) NOT NULL,
  number VARCHAR(20) NOT NULL,
  description VARCHAR(255) NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (clinic_id) REFERENCES clinic_info(id) ON DELETE CASCADE
);

-- ============================================
-- 6. 创建索引
-- ============================================

CREATE INDEX idx_appointments_user_id ON appointments(user_id);
CREATE INDEX idx_appointments_doctor_id ON appointments(doctor_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_timeslots_doctor_date ON time_slots(doctor_id, date);
CREATE INDEX idx_timeslots_available ON time_slots(is_available);
CREATE INDEX idx_invoices_user_id ON invoices(user_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_doctors_specialty ON doctors(specialty);
CREATE INDEX idx_doctors_is_active ON doctors(is_active);
```

---

## 版本历史

| 版本 | 日期 | 变更说明 |
|------|------|----------|
| 1.0.0 | 2026-01-12 | 初始版本 - 基础表结构设计 |

---

## 技术支持

如有数据库设计问题，请联系开发团队。

**文档维护**: Development Team  
**最后审核**: 2026-01-12
