# AI Quick Reference Card

> Copy-paste friendly rules for any AI coding assistant

## Project: Customer App (Medical Clinic - Australia)

## Stack
- React Native + Expo
- TypeScript (strict)
- React Query + Zustand
- Zod validation

## Principles
```
KISS  = Simple > Clever
SOLID = Clean Architecture
DRY   = No Repetition
```

## Naming
```
Component  → PascalCase      → AppointmentCard.tsx
Function   → camelCase       → formatDateTime()
Constant   → SCREAMING_SNAKE → MAX_APPOINTMENTS
Type       → IPrefix/TPrefix → IUser, TStatus
```

## Limits
```
File     → 150 lines max
Function → 50 lines max
Props    → 5 max (use object for more)
Nesting  → 3 levels max
```

## DO
```
✓ TypeScript everywhere (no any)
✓ Handle errors and loading
✓ Validate inputs
✓ Use constants
✓ Test critical paths
✓ Mask sensitive data
```

## DON'T
```
✗ any type
✗ @ts-ignore
✗ console.log
✗ Hardcoded strings
✗ Plain text secrets
✗ Skip error handling
```

## Component Template
```typescript
import React from 'react';
import { View } from 'react-native';

interface Props {
  title: string;
}

export const MyComponent: React.FC<Props> = ({ title }) => {
  return <View />;
};
```

## Service Template
```typescript
export const myService = {
  getAll: () => api.get('/endpoint'),
  getById: (id: string) => api.get(`/endpoint/${id}`),
  create: (data: Dto) => api.post('/endpoint', data),
};
```

## Security Checklist
```
□ Medicare masked (XXXX-XXXXX-X)
□ HTTPS only
□ Inputs validated
□ No secrets in code
□ Privacy Act compliant
```

## Files to Read
- `/rules/PROJECT_RULES.md` - Full guidelines
- `/CLAUDE.md` - Claude Code config
- `/.cursorrules` - Cursor config
- `/.windsurfrules` - Windsurf config
- `/.github/copilot-instructions.md` - Copilot config
- `/.clinerules` - Cline config
