# GitHub Copilot Instructions - Customer App

## Project Context
Patient-facing mobile app for Australian medical clinic. Features: appointment booking, smart reminders, Medicare integration, billing, clinic info.

## Tech Stack
React Native (Expo), TypeScript (strict), React Query, Zustand, Zod

## Core Principles

### KISS
- Simple, readable code
- One function = one responsibility
- No over-engineering

### SOLID
- Single Responsibility
- Open/Closed
- Liskov Substitution
- Interface Segregation
- Dependency Inversion

### DRY
- Extract repeated logic
- Use constants
- No copy-paste

## Code Style

### Naming
```
Components:  PascalCase     (AppointmentCard.tsx)
Functions:   camelCase      (formatDateTime)
Constants:   SCREAMING_SNAKE (MAX_APPOINTMENTS)
Types:       IPascalCase    (IUser, TStatus)
```

### Limits
- File: 150 lines
- Function: 50 lines
- Props: 5 max
- Nesting: 3 levels

### Component Pattern
```typescript
import React from 'react';
import { View } from 'react-native';
import { useHook } from '@/hooks';
import styles from './styles';

interface Props {
  data: DataType;
}

export const Component: React.FC<Props> = ({ data }) => {
  const state = useHook();

  return <View>{/* JSX */}</View>;
};
```

## Requirements

### ALWAYS
- TypeScript strict (no any)
- Error handling
- Loading states
- Input validation
- Constants for strings
- Tests for critical paths

### NEVER
- `any` type
- `@ts-ignore`
- `console.log`
- Plain text secrets
- Hardcoded strings
- Skip error handling

## Security (Medical App)
- Mask Medicare: XXXX-XXXXX-X
- HTTPS only
- Validate inputs
- Australian Privacy Act

## File Structure
```
src/
├── components/{common,features}/
├── screens/
├── services/
├── hooks/
├── utils/
├── constants/
├── types/
└── store/
```

## Full Documentation
See `/rules/PROJECT_RULES.md`
