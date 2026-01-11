# 患者端 App（Customer App）产品需求文档

**版本**: v1.0
**创建日期**: 2026-01-11
**状态**: Draft

---

## 1. 产品概述

### 1.1 产品背景
当前诊所面临以下痛点：
- 患者预约管理依赖人工，前台压力大
- 爽约率高，造成资源浪费
- 缺乏系统化的患者沟通渠道
- 诊所专业形象有待提升

### 1.2 产品目标
| 目标 | 关键指标 |
|------|----------|
| 提升患者体验 | 患者满意度 ≥ 4.5/5 |
| 减少前台压力 | 线上预约率 ≥ 60% |
| 减少爽约 | 爽约率降低 50% |
| 提升诊所专业度 | App评分 ≥ 4.0 |

### 1.3 目标用户
- 主要用户：诊所现有及潜在患者
- 用户年龄：18-70岁
- 使用场景：预约挂号、查看账单、接收提醒

---

## 2. 功能模块详细需求

### 2.1 用户账户模块 (User Account)

#### 2.1.1 注册 / 登录 (Register / Login)

**功能描述**：用户创建账户并登录系统

**用户故事**：
- 作为新用户，我希望能快速注册账号，以便使用App服务
- 作为已注册用户，我希望能方便地登录，以便管理我的预约

**功能需求**：

| 功能点 | 描述 | 优先级 |
|--------|------|--------|
| 手机号注册 | 使用手机号 + 短信验证码注册 | P0 |
| 邮箱注册 | 使用邮箱 + 密码注册 | P0 |
| 密码登录 | 手机号/邮箱 + 密码登录 | P0 |
| 验证码登录 | 手机号 + 短信验证码登录 | P1 |
| 忘记密码 | 通过手机/邮箱重置密码 | P0 |
| 第三方登录 | Apple ID / Google 登录 | P2 |
| 生物识别 | Face ID / Touch ID 快速登录 | P1 |

**业务规则**：
- 密码要求：最少8位，包含字母和数字
- 验证码有效期：5分钟
- 登录失败5次锁定账户30分钟

**页面**：
- 欢迎页 (Welcome Screen)
- 登录页 (Login Page)
- 注册页 (Register Page)
- 忘记密码页 (Forgot Password Page)

---

#### 2.1.2 个人资料管理 (Profile Management)

**功能描述**：用户管理个人信息和医疗相关资料

**用户故事**：
- 作为用户，我希望能维护我的个人信息，以便诊所能准确联系我
- 作为用户，我希望能保存我的Medicare信息，以便快速完成挂号

**功能需求**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| 姓名 (Full Name) | 文本 | 是 | 与证件一致 |
| 性别 (Gender) | 选择 | 是 | Male/Female/Other |
| 出生日期 (DOB) | 日期 | 是 | 用于身份核验 |
| 手机号 (Mobile) | 数字 | 是 | 主要联系方式 |
| 邮箱 (Email) | 文本 | 否 | 备用联系方式 |
| 地址 (Address) | 文本 | 否 | 居住地址 |
| Medicare 卡号 | 文本 | 否 | 格式校验 |
| Medicare IRN | 数字 | 否 | 1-9 |
| Medicare 有效期 | 日期 | 否 | 过期提醒 |
| 私人保险信息 | 文本 | 否 | 保险公司+会员号 |
| 紧急联系人 | 文本 | 否 | 姓名+电话 |

**业务规则**：
- Medicare 卡号格式校验：10位数字
- Medicare 即将过期（30天内）时提醒更新
- 敏感信息需二次验证后才能修改

**页面**：
- 个人资料页 (Profile Page)
- 编辑资料页 (Edit Profile Page)
- Medicare 信息页 (Medicare Details Page)

---

#### 2.1.3 隐私与授权设置 (Privacy & Consent Settings)

**功能描述**：用户管理隐私偏好和数据授权

**功能需求**：

| 设置项 | 描述 | 默认值 |
|--------|------|--------|
| 营销通知 | 是否接收诊所促销信息 | 关闭 |
| 数据共享 | 是否同意匿名数据分析 | 关闭 |
| 隐私政策 | 查看完整隐私政策 | - |
| 服务条款 | 查看服务条款 | - |
| 数据导出 | 导出个人数据 | - |
| 账户注销 | 永久删除账户 | - |

**页面**：
- 隐私设置页 (Privacy Settings Page)

---

### 2.2 预约管理模块 (Appointment Management)

#### 2.2.1 预约挂号 (Book Appointment)

**功能描述**：用户在线预约诊所服务

**用户故事**：
- 作为用户，我希望能查看医生的可用时间，以便选择合适的时间段
- 作为用户，我希望能选择特定医生，以便获得连续性医疗服务

**预约流程**：

```
选择服务类型 → 选择医生(可选) → 选择日期 → 选择时间段 → 确认信息 → 提交预约 → 预约成功
```

**功能需求**：

| 功能点 | 描述 | 优先级 |
|--------|------|--------|
| 服务类型选择 | GP Consultation / Specialist / Health Check 等 | P0 |
| 医生选择 | 显示医生头像、简介、可约时间 | P0 |
| 日历视图 | 按周/月查看可用时间 | P0 |
| 时间段选择 | 显示可用/已满状态 | P0 |
| 预约原因 | 填写就诊原因（选填） | P1 |
| 首诊/复诊 | 标记是否首次就诊 | P1 |
| 候补名单 | 满员时加入候补 | P2 |

**业务规则**：
- 预约时间范围：当天起14天内
- 每人同一天最多预约1次
- 预约需提前至少2小时
- 预约成功后发送确认通知

**页面**：
- 预约首页 (Booking Home Page)
- 选择医生页 (Select Doctor Page)
- 选择时间页 (Select Time Page)
- 确认预约页 (Confirm Booking Page)
- 预约成功页 (Booking Success Page)

---

#### 2.2.2 查看预约 (View Appointments)

**功能描述**：用户查看即将到来的预约和历史预约

**用户故事**：
- 作为用户，我希望能看到我的所有预约，以便安排我的时间
- 作为用户，我希望能查看预约详情，以便了解就诊信息

**功能需求**：

| 功能点 | 描述 | 优先级 |
|--------|------|--------|
| 即将到来 | 显示未来预约列表 | P0 |
| 历史记录 | 显示已完成/取消的预约 | P0 |
| 预约详情 | 时间、医生、地点、状态 | P0 |
| 日历集成 | 添加到系统日历 | P1 |
| 地图导航 | 点击地址跳转导航 | P1 |

**预约状态**：
- `Confirmed` - 已确认
- `Pending` - 待确认
- `Completed` - 已完成
- `Cancelled` - 已取消
- `No-show` - 爽约

**页面**：
- 我的预约页 (My Appointments Page)
- 预约详情页 (Appointment Details Page)

---

#### 2.2.3 取消 / 改期 (Cancel / Reschedule)

**功能描述**：用户取消或修改已有预约

**用户故事**：
- 作为用户，我希望能取消无法赴约的预约，以便释放时间给其他患者
- 作为用户，我希望能改期，以便在有冲突时调整

**功能需求**：

| 功能点 | 描述 | 优先级 |
|--------|------|--------|
| 取消预约 | 提交取消原因 | P0 |
| 预约改期 | 选择新时间 | P0 |
| 取消政策 | 显示取消规则 | P0 |
| 取消确认 | 二次确认防误操作 | P0 |

**业务规则**：
- 免费取消：预约前24小时以上
- 迟到取消（24小时内）：记录但不收费
- 多次爽约（3次/月）：限制预约功能
- 取消后释放时间段供他人预约

---

### 2.3 智能提醒系统 (Smart Reminder System) ⭐ 重点模块

#### 2.3.1 自动提醒 (Automatic Reminders)

**功能描述**：系统自动发送预约提醒，减少爽约

**用户故事**：
- 作为用户，我希望能收到预约提醒，以免忘记就诊
- 作为用户，我希望能选择提醒方式，以便通过我偏好的渠道接收

**提醒时间节点**：

| 时间点 | 提醒内容 | 渠道 |
|--------|----------|------|
| 预约成功后 | 预约确认信息 | Push + SMS + Email |
| 提前24小时 | 预约提醒 | Push + SMS |
| 提前2小时 | 最后提醒 | Push |
| 就诊后24小时 | 满意度调查 | Push |

**提醒内容模板**：

```
【24小时提醒】
您好 {姓名}，
您预约的 {医生姓名} 门诊将于明天 {时间} 进行。
地址：{诊所地址}
如需取消或改期，请提前操作。
```

```
【2小时提醒】
您的预约将于2小时后开始。
医生：{医生姓名}
时间：{时间}
请准时到达，带好 Medicare 卡。
```

**功能需求**：

| 功能点 | 描述 | 优先级 |
|--------|------|--------|
| Push 通知 | App内推送通知 | P0 |
| SMS 短信 | 发送短信提醒 | P0 |
| Email 邮件 | 发送邮件提醒 | P1 |
| 提醒偏好 | 用户选择接收渠道 | P0 |
| 提醒时间设置 | 自定义提前提醒时间 | P1 |
| 勿扰时间 | 设置不接收通知的时间段 | P2 |

---

#### 2.3.2 爽约跟进 (Missed Appointment Follow-up)

**功能描述**：对爽约患者进行系统跟进

**功能需求**：

| 功能点 | 描述 | 优先级 |
|--------|------|--------|
| 爽约通知 | 发送爽约记录通知 | P0 |
| 重新预约 | 引导快速重新预约 | P0 |
| 爽约原因 | 收集爽约原因 | P1 |
| 爽约统计 | 显示个人爽约记录 | P1 |

**爽约跟进流程**：
```
爽约发生 → 标记状态 → 发送通知 → 收集原因 → 引导重新预约
```

**页面**：
- 通知设置页 (Notification Settings Page)
- 提醒历史页 (Reminder History Page)

---

### 2.4 账单与支付模块 (Billing & Payment)

#### 2.4.1 查看账单 (View Invoices)

**功能描述**：用户查看历史账单和费用明细

**用户故事**：
- 作为用户，我希望能查看我的账单，以便了解费用情况
- 作为用户，我希望能下载账单，以便报销使用

**功能需求**：

| 功能点 | 描述 | 优先级 |
|--------|------|--------|
| 账单列表 | 按时间倒序显示 | P0 |
| 账单详情 | 显示费用明细 | P0 |
| 账单状态 | 已付/待付/Medicare处理中 | P0 |
| 下载账单 | PDF格式下载 | P1 |
| 发送账单 | 发送到邮箱 | P2 |

**账单信息**：
- 账单编号
- 就诊日期
- 服务项目
- 费用金额
- Medicare 报销金额
- 个人支付金额
- 支付状态

---

#### 2.4.2 Medicare Bulk Billing 记录

**功能描述**：查看 Medicare Bulk Billing 处理状态

**功能需求**：

| 功能点 | 描述 | 优先级 |
|--------|------|--------|
| Bulk Billing 记录 | 显示所有BB记录 | P0 |
| 处理状态 | 已提交/处理中/已返还 | P0 |
| 返还金额 | 显示Medicare返还金额 | P0 |

---

#### 2.4.3 在线支付 (Online Payment)

**功能描述**：用户在线支付医疗费用

**功能需求**：

| 功能点 | 描述 | 优先级 |
|--------|------|--------|
| 支付方式 | 信用卡/借记卡/Apple Pay | P1 |
| 保存卡片 | 保存支付方式 | P2 |
| 支付历史 | 查看支付记录 | P1 |
| 收据 | 生成电子收据 | P1 |

**页面**：
- 账单列表页 (Invoice List Page)
- 账单详情页 (Invoice Details Page)
- 支付页 (Payment Page)
- 支付成功页 (Payment Success Page)

---

### 2.5 诊所信息模块 (Clinic Information)

#### 2.5.1 医生介绍 (Doctor Profiles)

**功能描述**：展示诊所医生信息

**显示内容**：
- 头像照片
- 姓名、职称
- 专业领域
- 教育背景
- 执业资质
- 语言能力
- 简介

**页面**：
- 医生列表页 (Doctors Page)
- 医生详情页 (Doctor Profile Page)

---

#### 2.5.2 诊所信息 (Clinic Details)

**功能描述**：展示诊所基本信息

**显示内容**：

| 信息 | 说明 |
|------|------|
| 诊所名称 | - |
| 营业时间 | 按周显示，标注节假日 |
| 地址 | 支持一键导航 |
| 电话 | 支持一键拨打 |
| 停车信息 | 周边停车指引 |
| 交通指引 | 公共交通信息 |

---

#### 2.5.3 紧急联系 (Emergency Contact)

**功能描述**：提供紧急情况联系方式

**显示内容**：
- 诊所紧急电话
- After Hours 服务信息
- 急救电话 (000)
- 健康热线 (Healthdirect 1800 022 222)
- 心理援助热线

**页面**：
- 诊所信息页 (Clinic Info Page)
- 紧急联系页 (Emergency Contacts Page)

---

## 3. 非功能需求

### 3.1 性能需求
| 指标 | 要求 |
|------|------|
| 页面加载时间 | ≤ 2秒 |
| API 响应时间 | ≤ 500ms |
| App 启动时间 | ≤ 3秒 |
| 崩溃率 | ≤ 0.1% |

### 3.2 安全需求
- 所有数据传输使用 HTTPS
- 敏感数据加密存储
- 符合澳大利亚隐私法 (Privacy Act 1988)
- 符合健康记录法规要求
- 定期安全审计

### 3.3 兼容性需求
| 平台 | 最低版本 |
|------|----------|
| iOS | 14.0+ |
| Android | 10.0+ |

### 3.4 可用性需求
- 系统可用性 ≥ 99.5%
- 支持离线查看已缓存的预约信息
- 网络异常时友好提示

### 3.5 本地化需求
- 主要语言：英文
- 次要语言：中文（简体）
- 支持多语言切换

---

## 4. 页面清单汇总

| 模块 | 页面名称 | 优先级 |
|------|----------|--------|
| 入口 | Welcome Screen | P0 |
| 账户 | Login Page | P0 |
| 账户 | Register Page | P0 |
| 账户 | Forgot Password Page | P0 |
| 账户 | Profile Page | P0 |
| 账户 | Edit Profile Page | P0 |
| 账户 | Privacy Settings Page | P1 |
| 预约 | Booking Home Page | P0 |
| 预约 | Select Doctor Page | P0 |
| 预约 | Select Time Page | P0 |
| 预约 | Confirm Booking Page | P0 |
| 预约 | Booking Success Page | P0 |
| 预约 | My Appointments Page | P0 |
| 预约 | Appointment Details Page | P0 |
| 提醒 | Notification Settings Page | P0 |
| 提醒 | Reminder History Page | P1 |
| 账单 | Invoice List Page | P1 |
| 账单 | Invoice Details Page | P1 |
| 账单 | Payment Page | P2 |
| 诊所 | Doctors Page | P1 |
| 诊所 | Doctor Profile Page | P1 |
| 诊所 | Clinic Info Page | P1 |
| 诊所 | Emergency Contacts Page | P1 |

---

## 5. 数据实体

### 5.1 用户 (User)
```
User {
  id: UUID
  phone: String
  email: String
  password_hash: String
  full_name: String
  gender: Enum
  date_of_birth: Date
  address: String
  medicare_number: String
  medicare_irn: Integer
  medicare_expiry: Date
  private_insurance: String
  emergency_contact_name: String
  emergency_contact_phone: String
  notification_preferences: JSON
  created_at: DateTime
  updated_at: DateTime
}
```

### 5.2 预约 (Appointment)
```
Appointment {
  id: UUID
  user_id: UUID (FK)
  doctor_id: UUID (FK)
  service_type: String
  appointment_date: Date
  start_time: Time
  end_time: Time
  status: Enum [Pending, Confirmed, Completed, Cancelled, NoShow]
  reason: String
  is_first_visit: Boolean
  notes: String
  created_at: DateTime
  updated_at: DateTime
}
```

### 5.3 医生 (Doctor)
```
Doctor {
  id: UUID
  name: String
  title: String
  specialty: String
  bio: String
  photo_url: String
  languages: Array<String>
  qualifications: Array<String>
  is_active: Boolean
}
```

### 5.4 账单 (Invoice)
```
Invoice {
  id: UUID
  user_id: UUID (FK)
  appointment_id: UUID (FK)
  invoice_number: String
  total_amount: Decimal
  medicare_rebate: Decimal
  patient_payment: Decimal
  status: Enum [Pending, Paid, Processing]
  created_at: DateTime
  paid_at: DateTime
}
```

### 5.5 提醒 (Reminder)
```
Reminder {
  id: UUID
  appointment_id: UUID (FK)
  reminder_type: Enum [Confirmation, 24Hour, 2Hour, Followup]
  channel: Enum [Push, SMS, Email]
  scheduled_at: DateTime
  sent_at: DateTime
  status: Enum [Pending, Sent, Failed]
}
```

---

## 6. 发布计划建议

### Phase 1 - MVP (核心功能)
- 用户注册登录
- 预约挂号、查看、取消
- 基础提醒功能 (Push + SMS)
- 诊所信息展示

### Phase 2 - 增强
- 账单查看
- Medicare Bulk Billing 记录
- 提醒偏好设置
- 医生详细介绍

### Phase 3 - 完善
- 在线支付
- 多语言支持
- 第三方登录
- 候补名单功能

---

## 7. 成功指标

| 指标 | 目标 | 衡量方式 |
|------|------|----------|
| 注册转化率 | ≥ 50% | 下载用户中完成注册的比例 |
| 线上预约率 | ≥ 60% | 线上预约/总预约数 |
| 爽约率 | ≤ 5% | 爽约数/总预约数 |
| 用户留存 (7天) | ≥ 40% | 7天后仍活跃的用户比例 |
| App评分 | ≥ 4.0 | App Store / Play Store评分 |
| NPS | ≥ 50 | 用户净推荐值 |

---

## 8. 附录

### 8.1 术语表
| 术语 | 解释 |
|------|------|
| Medicare | 澳大利亚国民医疗保险 |
| Bulk Billing | 医生直接向Medicare收费，患者无需自费 |
| IRN | Individual Reference Number，Medicare卡上的个人编号 |
| GP | General Practitioner，全科医生 |
| No-show | 爽约，预约但未到 |

### 8.2 参考文档
- 澳大利亚隐私法 Privacy Act 1988
- My Health Records Act 2012
- Australian Digital Health Agency Guidelines

---

*文档结束*
