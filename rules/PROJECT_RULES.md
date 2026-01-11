# Project Rules - Customer App

> **IMPORTANT**: All AI coding assistants and developers MUST follow these rules strictly.

---

## Core Principles

### KISS - Keep It Simple, Stupid
- Write simple, readable code that a junior developer can understand
- Avoid over-engineering and premature optimization
- One function should do one thing well
- If a solution feels complex, step back and simplify

### SOLID Principles
- **S**ingle Responsibility: Each class/module has one reason to change
- **O**pen/Closed: Open for extension, closed for modification
- **L**iskov Substitution: Subtypes must be substitutable for base types
- **I**nterface Segregation: Many specific interfaces over one general-purpose
- **D**ependency Inversion: Depend on abstractions, not concretions

### DRY - Don't Repeat Yourself
- Extract repeated logic into reusable functions/components
- Use constants for magic numbers and strings
- Create shared utilities for common operations
- If you copy-paste, you're probably doing it wrong

---

## Project Architecture

```
src/
├── components/       # Reusable UI components
│   ├── common/       # Buttons, Inputs, Cards, etc.
│   └── features/     # Feature-specific components
├── screens/          # Screen/Page components
├── services/         # API calls and external services
├── hooks/            # Custom React hooks
├── utils/            # Helper functions
├── constants/        # App constants and configs
├── types/            # TypeScript type definitions
├── store/            # State management
└── assets/           # Images, fonts, etc.
```

---

## Coding Standards

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `AppointmentCard.tsx` |
| Functions | camelCase | `formatDateTime()` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_APPOINTMENTS` |
| Types/Interfaces | PascalCase with prefix | `IUser`, `TAppointment` |
| Files (components) | PascalCase | `BookingForm.tsx` |
| Files (utils) | camelCase | `dateUtils.ts` |
| CSS classes | kebab-case | `appointment-card` |
| API endpoints | kebab-case | `/api/appointments/book-slot` |

### File Structure Rules

```typescript
// 1. Imports (grouped and ordered)
import React from 'react';                    // React first
import { View, Text } from 'react-native';    // External libs
import { useAuth } from '@/hooks';            // Internal absolute
import { Button } from '../components';       // Internal relative
import styles from './styles';                // Styles last

// 2. Types/Interfaces
interface Props {
  // ...
}

// 3. Constants (component-specific)
const MAX_ITEMS = 10;

// 4. Component
export const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  // hooks first
  // state second
  // effects third
  // handlers fourth
  // render last
};

// 5. Styles (if inline)
```

---

## Component Rules

### DO
```typescript
// Small, focused components
const AppointmentCard = ({ appointment }: Props) => (
  <Card>
    <AppointmentHeader appointment={appointment} />
    <AppointmentDetails appointment={appointment} />
    <AppointmentActions appointment={appointment} />
  </Card>
);
```

### DON'T
```typescript
// God components with everything inside
const AppointmentCard = ({ appointment }: Props) => (
  <Card>
    {/* 200 lines of mixed logic and UI */}
  </Card>
);
```

### Component Size Limits
- Max 150 lines per component file
- Max 50 lines per function
- Max 5 props per component (use object props for more)
- Max 3 levels of nesting in JSX

---

## State Management Rules

### Local State
- Use `useState` for simple, component-local state
- Use `useReducer` for complex state logic

### Global State
- Only store truly global data (user session, theme, language)
- API data should use React Query or similar (not global state)
- Avoid prop drilling more than 2 levels - use context or composition

### State Shape
```typescript
// DO: Normalized, flat state
interface AppState {
  appointments: Record<string, Appointment>;
  appointmentIds: string[];
}

// DON'T: Deeply nested state
interface AppState {
  user: {
    appointments: {
      upcoming: {
        data: Appointment[];
      };
    };
  };
}
```

---

## API & Data Rules

### Service Layer Pattern
```typescript
// services/appointmentService.ts
export const appointmentService = {
  getAll: () => api.get<Appointment[]>('/appointments'),
  getById: (id: string) => api.get<Appointment>(`/appointments/${id}`),
  create: (data: CreateAppointmentDto) => api.post('/appointments', data),
  cancel: (id: string) => api.delete(`/appointments/${id}`),
};
```

### Error Handling
```typescript
// Always handle errors explicitly
try {
  const result = await appointmentService.create(data);
  return result;
} catch (error) {
  if (error instanceof ApiError) {
    // Handle API errors
  }
  throw error; // Re-throw unknown errors
}
```

### Data Validation
- Validate all user inputs before submission
- Use Zod or Yup for schema validation
- Never trust client-side validation alone

---

## Security Rules

### NEVER
- Store sensitive data in plain text
- Log sensitive information (passwords, tokens, Medicare numbers)
- Use inline SQL queries (use parameterized queries)
- Trust user input without validation
- Expose internal error details to users
- Commit secrets or API keys

### ALWAYS
- Use HTTPS for all API calls
- Sanitize user inputs
- Implement proper authentication checks
- Use secure storage for tokens
- Mask sensitive data in UI (Medicare: XXXX-XXXXX-X)

---

## Testing Rules

### Test File Naming
- `ComponentName.test.tsx` for component tests
- `functionName.test.ts` for utility tests
- `serviceName.integration.test.ts` for integration tests

### Test Coverage Requirements
- Minimum 80% coverage for utilities
- Minimum 70% coverage for components
- 100% coverage for critical paths (auth, payment, booking)

### What to Test
```typescript
// DO test:
// - User interactions
// - Edge cases
// - Error states
// - Business logic

// DON'T test:
// - Implementation details
// - Third-party libraries
// - Styling
```

---

## Performance Rules

### Optimization Checklist
- [ ] Use `React.memo` for expensive pure components
- [ ] Use `useMemo` for expensive calculations
- [ ] Use `useCallback` for callbacks passed to children
- [ ] Lazy load screens and heavy components
- [ ] Optimize images (WebP, proper sizing)
- [ ] Virtualize long lists (FlatList, not ScrollView)

### Bundle Size
- Max 200KB for initial bundle (gzipped)
- Code-split by route
- Analyze bundle regularly

---

## Git Rules

### Branch Naming
```
feature/TICKET-123-add-booking-flow
bugfix/TICKET-456-fix-reminder-timing
hotfix/critical-auth-issue
```

### Commit Message Format
```
type(scope): subject

body (optional)

footer (optional)
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Examples
```
feat(booking): add appointment cancellation flow
fix(reminder): correct 24h notification timing
refactor(auth): simplify login state management
```

---

## Documentation Rules

### Code Comments
```typescript
// DO: Explain WHY, not WHAT
// Calculate buffer time to account for doctor's previous appointment overrun
const bufferMinutes = 15;

// DON'T: State the obvious
// Add 15 to minutes
const bufferMinutes = 15;
```

### Required Documentation
- README.md for setup instructions
- API documentation for all endpoints
- Component props documentation (TypeScript + JSDoc for complex props)

---

## Forbidden Patterns

### Code Smells to Avoid
- `any` type in TypeScript (use `unknown` if truly unknown)
- `// @ts-ignore` or `// eslint-disable` without justification
- `console.log` in production code (use proper logging)
- Magic numbers without constants
- Nested ternaries (max 1 level)
- Functions with more than 4 parameters

### Anti-patterns
```typescript
// DON'T: Prop drilling
<A user={user}><B user={user}><C user={user}><D user={user}/></C></B></A>

// DON'T: God objects
const utils = { /* 50 unrelated functions */ };

// DON'T: Premature abstraction
const AbstractFactoryBuilderPattern = /* for a simple form */;
```

---

## Quick Reference Checklist

Before committing, verify:

- [ ] Code follows naming conventions
- [ ] No TypeScript errors or warnings
- [ ] No ESLint errors or warnings
- [ ] Component is under 150 lines
- [ ] Functions are under 50 lines
- [ ] No hardcoded strings (use constants/i18n)
- [ ] Error states are handled
- [ ] Loading states are handled
- [ ] Tests are written for new code
- [ ] No console.log statements
- [ ] No sensitive data exposed
- [ ] Accessibility basics covered (labels, roles)

---

## AI Assistant Instructions

When generating code for this project:

1. **Read existing code first** - Match the existing patterns and style
2. **Keep it simple** - The simplest solution that works is the best
3. **One thing at a time** - Each function/component does one thing
4. **Type everything** - Full TypeScript coverage, no `any`
5. **Handle errors** - Every async operation needs error handling
6. **Think security** - Validate inputs, sanitize outputs
7. **Test critical paths** - Auth, booking, payment must have tests
8. **Document the why** - Comments explain reasoning, not mechanics

---

*Last updated: 2026-01-11*
