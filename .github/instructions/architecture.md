---
description: 'React Native architecture standards (Koç Mobil)'
applyTo: '**/*'
---

Koc Mobil - React Native Architecture

Scope

- Defines the standard architecture for a brand-new React Native project.
- Covers folder structure, feature/shared rules, API layer, navigation, theming, state management, and default libraries.
- All new code must comply with these rules.

Out of scope

- Product-specific requirements and feature business logic.
- CI/CD, release process, or infrastructure setup.

1. Folder Structure Rules
   Root structure

- All source code must live under src/.
- Allowed top-level folders under src/:
  - features/
  - shared/
  - navigation/
  - services/
  - store/
  - theme/
  - config/
  - @types/
  - i18n/
  - assets/
- Do not create arbitrary root-level folders outside src/.

Feature rules (src/features)

- Each business feature must be isolated under src/features/<featureName>/.
- Feature structure must follow:
  - screens/
  - components/
  - hooks/
  - services/
  - types.ts
  - index.ts
- Do not import across features directly.
- Use shared layer for reusable logic.
- API calls must not be made directly inside components.
- Each feature must remain modular and independently maintainable.

Shared layer rules (src/shared)

- Shared is only for reusable cross-feature logic.
- Structure:
  - shared/
    - hooks/
    - ui/
    - utils/
    - validation/
    - security/
    - platform/
- No feature-specific logic in shared.
- UI components must be reusable and presentation-focused.
- No business logic in shared/ui components.

2. State Management Rules
   We use

- Redux Toolkit
- Slice-based modular state
- Redux Persist
- RTK Query

Requirements

- Use slice-based architecture.
- Async operations must use RTK Query.
- Do not use local component state for global data.
- Store must remain modular and domain-separated.

3. API Layer Rules
   We use Redux Toolkit Query.

Mandatory pattern

- Use centralized baseApi.
- Inject domain endpoints.
- Use automatic authentication headers.
- Handle errors globally.

Strict rules

- No direct fetch or axios calls inside components.
- All network calls must go through RTK Query.

4. Navigation Rules
   Navigation is

- Feature-integrated
- Strongly typed with TypeScript
- Controlled via central Root Navigator

Requirements

- All routes must be typed.
- Do not use untyped navigation calls.
- Navigation parameters must be explicitly defined.

5. Theming Rules
   We use

- React Native Paper
- Central COLOR object
- Standard typography
- Standard shadow tokens

Strict rules

- Do not hardcode colors.
- Do not hardcode font sizes.
- Use theme provider.
- Inline styles should be minimal.

6. Default Libraries
   Mandatory libraries (install with yarn)

yarn add \
 @react-navigation/native \
 @react-navigation/native-stack \
 react-native-screens \
 react-native-safe-area-context \
 @reduxjs/toolkit \
 react-redux \
 redux-persist \
 @react-native-async-storage/async-storage \
 react-native-gesture-handler \
 reactotron-react-native \
 react-native-paper \
 react-native-config

7. Package Manager and iOS Pods
   Yarn (React Native)

- Use node-modules linker (Yarn PnP is not supported for RN tooling).
- Add this to .yarnrc.yml:
  nodeLinker: node-modules
- Run yarn install after changing the linker.

  iOS Pods

- After adding or updating native libraries, run:
  cd ios && pod install

8. Setup / Troubleshooting

- If TypeScript shows JSX or default import errors, verify tsconfig has:
  - jsx: react-jsx
  - esModuleInterop: true
  - allowSyntheticDefaultImports: true
- Restart the TypeScript server after dependency or tsconfig changes.
- If imports are not resolved, confirm node-modules linker is enabled and reinstall deps.

10. Compliance

- When a new project is created, follow this document to set up the folder structure and architecture.
- Any deviations require explicit justification and approval.
