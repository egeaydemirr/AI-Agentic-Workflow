# Koç Mobil - React Native Architecture

A React Native project following Koç Mobil architecture standards with Redux Toolkit, React Navigation, and React Native Paper.

## Features

✨ **Modular Architecture**: Feature-based folder structure  
🎨 **Theming**: React Native Paper with centralized colors and typography  
🔄 **State Management**: Redux Toolkit with RTK Query  
🧭 **Navigation**: React Navigation with TypeScript support  
📦 **Ready to Use**: Pre-configured with best practices

## Quick Start

### Prerequisites

- Node.js >= 22.11.0
- Yarn package manager
- iOS: Xcode and CocoaPods (macOS only)
- Android: Android Studio and JDK

### Installation

Run the setup script to install all dependencies:

```bash
chmod +x setup.sh
./setup.sh
```

Or manually:

```bash
# Install JavaScript dependencies
yarn install

# Install iOS dependencies (macOS only)
cd ios && pod install && cd ..

# Copy environment file
cp .env.example .env
```

### Running the App

```bash
# Start Metro bundler
yarn start

# Run on iOS (macOS only)
yarn ios

# Run on Android
yarn android
```

## Project Structure

```
src/
├── features/          # Business features (isolated modules)
│   └── home/
│       ├── screens/   # Screen components
│       ├── components/# Feature-specific components
│       ├── hooks/     # Custom hooks
│       ├── services/  # API endpoints (RTK Query)
│       └── types.ts   # TypeScript types
├── shared/            # Reusable cross-feature code
│   ├── ui/            # UI components (Button, Input, Card, etc.)
│   ├── hooks/         # Shared hooks
│   ├── utils/         # Utility functions
│   ├── validation/    # Validation schemas
│   ├── security/      # Security utilities
│   └── platform/      # Platform-specific helpers
├── navigation/        # React Navigation setup
├── services/          # API configuration
│   └── api/           # RTK Query base API
├── store/             # Redux store configuration
├── theme/             # Theme configuration
│   ├── colors.ts      # Color palette
│   ├── typography.ts  # Font styles
│   └── shadows.ts     # Shadow tokens
├── config/            # App configuration
├── i18n/              # Internationalization
├── @types/            # Global TypeScript types
└── assets/            # Static assets
```

## Technology Stack

- **React Native** 0.84.0
- **React Navigation** - Navigation library
- **Redux Toolkit** - State management
- **RTK Query** - Data fetching and caching
- **Redux Persist** - State persistence
- **React Native Paper** - UI component library
- **TypeScript** - Type safety
- **Yarn** - Package manager

## Architecture Guidelines

### Creating a New Feature

1. Create feature folder: `src/features/<feature-name>/`
2. Add required subfolders: `screens/`, `components/`, `hooks/`, `services/`
3. Define types in `types.ts`
4. Export public API in `index.ts`
5. Add navigation routes in `src/navigation/types.ts`

### Code Rules

- ✅ Use Redux Toolkit for state management
- ✅ Use RTK Query for API calls (no direct fetch/axios)
- ✅ Use typed navigation hooks
- ✅ Use theme colors (never hardcode)
- ✅ Keep features isolated
- ❌ Don't import between features
- ❌ Don't hardcode colors or fonts
- ❌ Don't put business logic in UI components

### Adding a New Screen

1. Create screen component in `src/features/<feature>/screens/`
2. Add route type to `src/navigation/types.ts`
3. Register screen in `src/navigation/RootNavigator.tsx`
4. Navigate using typed hook: `useNavigation()`

### Making API Calls

Use RTK Query by injecting endpoints into the base API:

```typescript
// src/features/myfeature/services/myApi.ts
import { baseApi } from '../../../services/api/baseApi';

export const myApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getData: builder.query<DataType, void>({
      query: () => '/endpoint',
    }),
  }),
});

export const { useGetDataQuery } = myApi;
```

## Environment Configuration

Create a `.env` file in the root directory:

```bash
API_BASE_URL=https://api.example.com
ENABLE_LOGS=true
```

## Documentation

- [Project Structure](./docs/PROJECT_STRUCTURE.md) - Detailed architecture documentation and visual overview
- [Architecture Guidelines](./.github/instructions/architecture.md) - Architecture standards
- [Setup Instructions](./docs/SETUP_INSTRUCTIONS.md) - Detailed setup guide
- [GitHub Skills](./docs/github-skills.md) - GitHub Skills kullanım rehberi
- [GitHub Custom Agents](./docs/github-custom-agents.md) - Custom agent oluşturma ve kullanım kılavuzu
- [AI Workflow Progress](./docs/AI_WORKFLOW_PROGRESS.md) - AI workflow geliştirme günlüğü

## Scripts

```bash
yarn start          # Start Metro bundler
yarn ios            # Run iOS app
yarn android        # Run Android app
yarn lint           # Run ESLint
yarn test           # Run tests
```

## Troubleshooting

### TypeScript Errors

If you see JSX or import errors:

1. Check `tsconfig.json` has correct settings
2. Run `yarn install` again
3. Restart TypeScript server in your IDE

### iOS Build Issues

```bash
cd ios
pod deintegrate
pod install
cd ..
```

### Android Build Issues

```bash
cd android
./gradlew clean
cd ..
```

## License

Private - Koç Mobil

---

Made with ❤️ following Koç Mobil architecture standards

# OR using Yarn

yarn android

````

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
````

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
