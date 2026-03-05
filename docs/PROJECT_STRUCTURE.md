# Koç Mobil - React Native Architecture

A React Native project following Koç Mobil architecture standards.

## Architecture

This project follows a modular, feature-based architecture:

### Folder Structure

```
src/
├── features/          # Business features (isolated)
│   └── home/          # Example feature
│       ├── screens/   # Feature screens
│       ├── components/# Feature-specific components
│       ├── hooks/     # Feature-specific hooks
│       ├── services/  # Feature API endpoints
│       └── types.ts   # Feature types
├── shared/            # Reusable cross-feature logic
│   ├── ui/            # Reusable components (Button, Input, etc.)
│   ├── hooks/         # Shared hooks (useDebounce, useKeyboard)
│   ├── utils/         # Utility functions
│   ├── validation/    # Validation schemas
│   ├── security/      # Security utilities
│   └── platform/      # Platform-specific helpers
├── navigation/        # Navigation configuration
├── services/          # API and external services
│   └── api/           # RTK Query setup
├── store/             # Redux store configuration
├── theme/             # Theming (colors, typography, shadows)
├── config/            # App configuration
├── i18n/              # Internationalization
├── @types/            # Global type definitions
└── assets/            # Static assets
```

## Technology Stack

- **React Navigation**: For navigation
- **Redux Toolkit**: State management
- **RTK Query**: API calls and caching
- **Redux Persist**: State persistence
- **React Native Paper**: UI component library and theming
- **TypeScript**: Type safety
- **Yarn**: Package manager (with node-modules linker)

## Getting Started

### Prerequisites

- Node.js >= 22.11.0
- Yarn
- iOS: Xcode and CocoaPods
- Android: Android Studio and JDK

### Installation

1. Install dependencies:

```bash
yarn install
```

2. Install iOS pods:

```bash
cd ios && pod install && cd ..
```

3. Copy environment file:

```bash
cp .env.example .env
```

### Running the App

```bash
# iOS
yarn ios

# Android
yarn android
```

## Architecture Rules

### Feature Rules

- Each feature must be isolated under `src/features/<featureName>/`
- Do not import across features directly
- Use the shared layer for reusable logic
- API calls must go through RTK Query (no direct fetch/axios)

### Shared Layer Rules

- Only for reusable, cross-feature logic
- No business logic in shared UI components
- Components must be presentation-focused

### State Management

- Use Redux Toolkit with slice-based architecture
- Async operations must use RTK Query
- No local component state for global data

### Navigation

- All routes must be typed
- Navigation parameters must be explicitly defined
- Use the typed `useNavigation` hook

### Theming

- Never hardcode colors or font sizes
- Use the `COLORS` and `TYPOGRAPHY` constants
- Use React Native Paper components when possible

## Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Keep components small and focused
- Separate business logic into custom hooks
- Write self-documenting code with clear naming

## Project Structure Details

### Features

Features are isolated business modules. Each feature has:

- `screens/`: Screen components
- `components/`: Feature-specific components
- `hooks/`: Custom hooks for business logic
- `services/`: RTK Query API endpoints
- `types.ts`: TypeScript types
- `index.ts`: Public exports

### Shared

Shared contains reusable code:

- `ui/`: Presentation components (Button, Input, Card, etc.)
- `hooks/`: Common hooks (useDebounce, useKeyboard, etc.)
- `utils/`: Helper functions
- `validation/`: Validation schemas
- `security/`: Security utilities
- `platform/`: Platform-specific code

### Redux Store

- Configured with Redux Toolkit
- RTK Query for API calls
- Redux Persist for state persistence
- Typed hooks (`useAppDispatch`, `useAppSelector`)

### Navigation

- React Navigation with Native Stack
- Strongly typed routes
- Centralized navigation configuration

### Theme

- React Native Paper theme
- Centralized colors, typography, and shadows
- No hardcoded values

## Visual & Conceptual Architecture Overview

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                       App.tsx                           │
│  ┌──────────────────────────────────────────────────┐  │
│  │         Redux Provider (Store)                    │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │      PersistGate (Redux Persist)           │  │  │
│  │  │  ┌──────────────────────────────────────┐  │  │  │
│  │  │  │   PaperProvider (Theme)              │  │  │  │
│  │  │  │  ┌────────────────────────────────┐  │  │  │  │
│  │  │  │  │  SafeAreaProvider            │  │  │  │  │
│  │  │  │  │  ┌──────────────────────────┐│  │  │  │  │
│  │  │  │  │  │   RootNavigator          ││  │  │  │  │
│  │  │  │  │  │   (React Navigation)     ││  │  │  │  │
│  │  │  │  │  └──────────────────────────┘│  │  │  │  │
│  │  │  │  └────────────────────────────────┘  │  │  │  │
│  │  │  └──────────────────────────────────────┘  │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Data Flow & Feature Isolation

```
┌─────────────┐
│   Screen    │ ← User interacts with UI
└──────┬──────┘
       │
       ├─→ Uses Shared UI Components (Button, Input, etc.)
       ├─→ Calls Custom Hook (useHomeScreen)
       ├─→ Dispatches Redux Actions
       └─→ Uses RTK Query Hooks
           └─→ Makes API Calls
               └─→ Auto-caches & updates state

Feature A                    Feature B
┌─────────────┐             ┌─────────────┐
│  screens/   │             │  screens/   │
│  components/│             │  components/│
│  hooks/     │             │  hooks/     │
│  services/  │             │  services/  │
│  types.ts   │             │  types.ts   │
└─────────────┘             └─────────────┘
       │                            │
       │    ❌ No direct imports    │
       └────────────┬───────────────┘
                    │
              ┌─────▼─────┐
              │  Shared   │
              │  Layer    │
              └───────────┘
```

### State Management & Theme System

```
┌────────────────────────────────────────────────┐
│            Redux Store                         │
│  ┌──────────────┐      ┌──────────────┐      │
│  │   Feature    │      │   Feature    │      │
│  │   Slices     │      │   Slices     │      │
│  └──────────────┘      └──────────────┘      │
│  ┌──────────────────────────────────────┐    │
│  │      RTK Query API Cache             │    │
│  │  (Auto-managed API state & cache)    │    │
│  └──────────────────────────────────────┘    │
└────────────────────────────────────────────────┘
                    │
                    ▼
          ┌─────────────────┐
          │  Redux Persist  │
          │  (AsyncStorage) │
          └─────────────────┘

┌─────────────────────────────────────────┐
│         React Native Paper              │
│              Theme                      │
│  ┌─────────────────────────────────┐   │
│  │  COLORS, TYPOGRAPHY, SHADOWS    │   │
└─────────────────────────────────────────┘
```

### API Call Flow (RTK Query)

```
Component
    │
    └─→ useGetDataQuery()
            │
            ├─→ Check Cache
            └─→ Make HTTP Request
                ├─→ baseApi (with auth headers)
                ├─→ fetchBaseQuery
                └─→ API Server
            ├─→ Success: Update cache & re-render
            └─→ Error: Global error handling
```

### Component Hierarchy Example

```
HomeScreen
├── SafeAreaView
│   └── View (container)
│       ├── Text (title)
│       ├── Card (from shared/ui)
│       └── Button (from shared/ui)
```

### Key Principles & Best Practices

- Feature Isolation: Her feature kendi içinde bağımsızdır
- Shared Reusability: Ortak kodlar shared katmanında
- Type Safety: Tüm projede güçlü TypeScript kullanımı
- Single Source of Truth: Global state için Redux
- Theme Consistency: Sabit renk/font yok, tema merkezi
- API Layer: Tüm network RTK Query ile
- Navigation Types: Tüm rotalar tipli
- Modular, test edilebilir, ölçeklenebilir yapı
- Otomatik cache, error handling, logging, validation

---

Bu mimari, sürdürülebilirlik, ölçeklenebilirlik, test edilebilirlik ve ekip işbirliği için optimize edilmiştir.
