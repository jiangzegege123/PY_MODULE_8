# CLAUDE.md - Project Guidelines for Claude Code

## Project Overview

Customer App - A patient-facing mobile application for an Australian medical clinic.

**Key Features:**
- Appointment booking and management
- Smart reminder system (24h/2h notifications via SMS/Push/Email)
- Medicare Bulk Billing integration
- Invoice viewing and online payments
- Clinic and doctor information

## Tech Stack
- React + Vite (Web)
- TypeScript (strict)
- React Router (navigation)
- TanStack Query (data fetching)
- Zustand (state management)
- Tailwind CSS (responsive styling)
- Zod (validation)

## Core Principles

### KISS - Keep It Simple, Stupid
- Simple, readable code over clever code
- No over-engineering or premature optimization
- One function does one thing

### SOLID
- **S**ingle Responsibility: Each module has one reason to change
- **O**pen/Closed: Open for extension, closed for modification
- **L**iskov Substitution: Subtypes substitutable for base types
- **I**nterface Segregation: Many specific interfaces > one general
- **D**ependency Inversion: Depend on abstractions

### DRY - Don't Repeat Yourself
- Extract repeated logic into reusable functions/components
- Use constants for magic numbers/strings
- If you copy-paste, refactor

## Coding Standards

### Naming Conventions
| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `AppointmentCard.tsx` |
| Functions | camelCase | `formatDateTime()` |
| Constants | SCREAMING_SNAKE | `MAX_APPOINTMENTS` |
| Types | PascalCase + prefix | `IUser`, `TAppointment` |

### File Limits
- Component: max 150 lines
- Function: max 50 lines
- Props: max 5 (use object for more)
- JSX nesting: max 3 levels

### Import Order
1. React
2. External libraries
3. Internal absolute imports
4. Internal relative imports
5. Styles

## Required Practices

### ALWAYS
- Use TypeScript strictly (no `any`)
- Handle error states
- Handle loading states
- Validate user inputs
- Use constants for hardcoded values
- Test critical paths (auth, booking, payment)

### NEVER
- Use `any` type (use `unknown` if needed)
- Use `@ts-ignore` without justification
- Leave `console.log` in production
- Store sensitive data in plain text
- Commit secrets or API keys
- Skip error handling for async operations

## Security Requirements (Medical App)

- Mask sensitive data: Medicare (XXXX-XXXXX-X)
- HTTPS for all API calls
- Validate all inputs server-side
- Follow Australian Privacy Act 1988
- Never log sensitive information

## Project Structure
```
src/
├── components/common/    # Reusable UI
├── components/features/  # Feature-specific
├── screens/              # Screen components
├── services/             # API layer
├── hooks/                # Custom hooks
├── utils/                # Helpers
├── constants/            # Constants
├── types/                # TypeScript types
├── store/                # State management
└── assets/               # Static assets
```

## Commands
```bash
npm run dev        # Start Vite dev server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## Complete Guidelines
See `/rules/PROJECT_RULES.md` for detailed coding standards, git conventions, testing requirements, and forbidden patterns.
