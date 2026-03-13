# Changelog

All notable changes to **Koç Mobile Architecture** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.1] - 2025-07-15

### Added

- feat(cart): implement full cart screen with Redux integration — `CartScreen.tsx` with FlatList, quantity controls (`+`/`-`/`Sil`), empty state, summary card and `Sepeti Temizle` action
- feat(cart): add `cartSlice` with actions (`addToCart`, `removeFromCart`, `increaseQuantity`, `decreaseQuantity`, `clearCart`) and selectors (`selectCartItems`, `selectCartTotalItems`, `selectCartTotalPrice`)
- feat(cart): persist cart state via `redux-persist` whitelist
- feat(navigation): add `Cart` route to `RootStackParamList` and register `CartScreen` in `RootNavigator`
- feat(home): add cart button to `HomeScreen` header for quick navigation
- feat(home): wire `handleAddToCart` in `ProductDetailScreen` — dispatches to cart and shows confirmation `Alert` with "Sepete Git" navigation

### Changed

- chore(theme): apply pastel green color palette across the app (`primary: #7FBF9A`, `background: #F4FBF6`, `text: #1F3A2C`, etc.)
- chore(theme): increase component `roundness` to `18` for a softer, corner-styled UI
- chore(theme): update all shadow colors to `#4F8D6B` (green tint)
- chore(components): tighten `borderRadius` values in `ProductCard` and `ProductListSkeleton` to match new rounded design system

### Fixed

- fix(assets): replace broken PNG import in `placeholder.ts` with an inline `ImageSourcePropType` URI object
- fix(ui): correct `elevation` type in `Card.tsx` to `0 | 1 | 2 | 3 | 4 | 5` to satisfy React Native Paper typings; remove unsupported `mode` prop

### Tests

- test(cart): add 11 unit tests for `cartSlice` covering all actions, edge cases and selectors
- test(cart): add 7 integration tests for `CartScreen` covering empty state, rendered items, quantity mutations, remove and clear-all scenarios
- chore(jest): extend `transformIgnorePatterns` to include `@reduxjs/toolkit` and `immer` to resolve ESM transform errors

---

## [1.0.0] - 2025-01-01

### Added

- Initial release of Koç Mobile Architecture boilerplate
- React Native + TypeScript project scaffold
- Feature-sliced architecture (`src/features/home`)
- RTK Query API layer (`homeApi`) with product listing and detail
- Redux Toolkit store with `redux-persist` (AsyncStorage)
- React Native Paper MD3 theming
- React Navigation (native stack)
- Jest + `@testing-library/react-native` setup
