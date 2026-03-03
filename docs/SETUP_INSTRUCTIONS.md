# Setup Instructions

## ✅ Project Structure Created Successfully!

The React Native project has been set up according to Koç Mobil architecture standards.

## 📋 Next Steps

### 1. Restart TypeScript Server (Important!)

The TypeScript language server needs to be restarted to recognize the newly installed packages:

**In VS Code:**

1. Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux)
2. Type: `TypeScript: Restart TS Server`
3. Press Enter

This will resolve the "Cannot find module" errors for packages like `react-native-paper`, `@reduxjs/toolkit`, etc.

### 2. Install iOS Dependencies (macOS only)

If you're on macOS and want to run the iOS app:

```bash
cd ios
pod install
cd ..
```

### 3. Set Up Environment Variables

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Then edit `.env` with your API configuration.

### 4. Run the Application

Start the Metro bundler:

```bash
yarn start
```

In a new terminal, run the app:

```bash
# For iOS (macOS only)
yarn ios

# For Android
yarn android
```

## 📁 Project Structure

The project follows a modular architecture:

```
src/
├── features/       # Business features (home example included)
├── shared/         # Reusable components and utilities
├── navigation/     # React Navigation setup
├── services/       # API configuration (RTK Query)
├── store/          # Redux store
├── theme/          # Colors, typography, shadows
├── config/         # App configuration
├── i18n/           # Internationalization
├── @types/         # TypeScript types
└── assets/         # Static assets
```

## 🎯 Key Features Implemented

✅ Redux Toolkit with RTK Query for state management  
✅ React Navigation with TypeScript support  
✅ React Native Paper theming  
✅ Modular feature-based architecture  
✅ Shared UI components (Button, Input, Card, Loading)  
✅ Custom hooks (useDebounce, useKeyboard)  
✅ Utility functions and validators  
✅ Example home feature with all required structure  
✅ Strongly typed navigation  
✅ Environment configuration support

## 📖 Documentation

- [README.md](./README.md) - Main project documentation
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Detailed architecture guide
- [architecture.md](./.github/instructions/architecture.md) - Architecture standards

## 🛠 Troubleshooting

### TypeScript Errors

If you still see "Cannot find module" errors after restarting TS Server:

1. Close and reopen VS Code
2. Run `yarn install` again
3. Delete `node_modules` and run `yarn install`

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

### Clearing Cache

```bash
# Clear Metro bundler cache
yarn start --reset-cache

# Clear watchman (macOS/Linux)
watchman watch-del-all
```

## 📝 Creating Your First Feature

1. Create a new feature folder: `src/features/myfeature/`
2. Add required subfolders: `screens/`, `components/`, `hooks/`, `services/`
3. Define types in `types.ts`
4. Create API endpoints using RTK Query in `services/`
5. Add navigation routes in `src/navigation/types.ts`
6. Register screens in `src/navigation/RootNavigator.tsx`

## 🎨 Using the Theme

```typescript
import { COLORS, TYPOGRAPHY, SHADOWS } from '../theme';

// Use colors
color: COLORS.primary

// Use typography
fontSize: TYPOGRAPHY.fontSize.lg

// Use shadows
...SHADOWS.medium
```

## 🔌 Making API Calls

```typescript
// Create API in feature services
import { baseApi } from '../../../services/api/baseApi';

export const myApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getData: builder.query<DataType, void>({
      query: () => '/endpoint',
    }),
  }),
});

export const { useGetDataQuery } = myApi;

// Use in component
const { data, isLoading, error } = useGetDataQuery();
```

## 🚀 You're Ready!

Your project is now set up and ready for development. Happy coding! 🎉

---

**Need Help?**  
Refer to the architecture documentation in [.github/instructions/architecture.md](./.github/instructions/architecture.md)
