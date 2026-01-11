# Simons Medical - Patient App

Australian medical clinic patient-facing mobile application.

## Features

- 📅 Online appointment booking
- 👨‍⚕️ Doctor profiles and selection
- 🏥 Clinic information
- 💳 Invoice management
- 🔔 Notification settings
- 👤 User profile management

## Tech Stack

- **Framework**: React (Vite)
- **Language**: TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS + NativeWind
- **Routing**: React Router
- **Data Fetching**: TanStack Query (React Query)
- **Form Validation**: Zod + React Hook Form

## Project Structure

```
customer-app/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── store/         # Zustand state management
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   └── mocks/         # Mock data
├── docs/              # Documentation
└── rules/             # Development rules and guidelines
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd customer-app
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Core Functionality

1. User authentication (login/register)
2. Appointment booking flow
3. Doctor selection and profiles
4. Clinic information and hours
5. Invoice viewing
6. Notification preferences
7. Profile management

## Services

- **GP Consultation** - General practitioner services (4 full-time doctors)
- **Skin Specialist** - Dermatology services (1 visiting specialist, available weekly)

## License

Private - Simons Medical © 2026
