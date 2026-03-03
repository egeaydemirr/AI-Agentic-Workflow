---
description: 'React Native TypeScript Guidelines (Enterprise, TS 5.x, ES2022)'
applyTo: '**/*.ts, **/*.tsx'
---

# React Native TypeScript – Enterprise Standards

This project uses TypeScript 5.x targeting ES2022 within a strict
enterprise React Native architecture.

All generated or modified code must prioritize:

- Strong typing
- Feature isolation
- Maintainability
- Scalability
- Architectural consistency

---

## 1) Core Principles

- Prefer clarity over cleverness.
- Respect feature-based + layered architecture.
- Extend existing abstractions before introducing new ones.
- Avoid shortcuts that weaken type safety.
- Keep code readable, explicit, and domain-oriented.

## 1.1) Type Safety Rules

- Do not use `any` unless there is no viable alternative and it is documented.
- Prefer `unknown` over `any`, and narrow it with type guards.
- Avoid type assertions (`as`) unless you are narrowing from a safe runtime check.
- Do not use non-null assertions (`!`) except at well-justified boundaries.
- Exported functions must have explicit return types.
- Public module types must be stable and intentional (avoid leaking internal types).

---

## 2) Module & Export Rules

- Use **ES Modules only**.
- Use **named exports only** (no default exports).
- Avoid circular dependencies.
- Keep modules single-purpose.
- Respect folder boundaries (feature isolation).

---

## 3) Naming Conventions

- **PascalCase** → Components, Interfaces, Types, Enums
- **camelCase** → Variables, functions, hooks
- Hooks must start with `use`
- Props interfaces must follow: `ComponentNameProps`

Example:

```ts
export interface LoginScreenProps {
  userId: string;
}
```

---

## 4) React Component Typing

- Prefer function components with explicitly typed props.
- Avoid `React.FC` unless you need implicit `children` typing.
- Keep props minimal and required; use optional props only when needed.
- Derive UI state from props and selectors, not from ad-hoc local state.
- Memoize components only when measurable render cost exists.

Example:

```ts
export interface ProfileHeaderProps {
  title: string;
  subtitle?: string;
  onEditPress: () => void;
}

export const ProfileHeader = ({
  title,
  subtitle,
  onEditPress,
}: ProfileHeaderProps) => {
  return <Header title={title} subtitle={subtitle} onEditPress={onEditPress} />;
};
```

---

## 5) Hooks & State

- Hooks must be pure and deterministic; avoid side effects in render.
- Custom hooks must expose typed results and typed inputs.
- Use `useMemo` and `useCallback` only when dependencies are stable and needed.
- For global state, use Redux Toolkit + RTK Query. Avoid global data in local state.
- Use typed app hooks: `useAppDispatch`, `useAppSelector`.

---

## 6) Redux Toolkit & RTK Query

- Use slice-based architecture; keep slices domain-scoped.
- Use RTK Query for all async operations and network calls.
- Endpoints must be injected into a centralized `baseApi`.
- Avoid `createAsyncThunk` unless RTK Query cannot model the use case.
- Normalize API responses only when necessary; keep selectors typed.

---

## 7) Navigation Typing

- Define all routes in a typed root param list.
- Do not use untyped navigation calls.
- Screen props must be typed using navigation helpers.

Example:

```ts
export type RootStackParamList = {
  Home: undefined;
  Details: { itemId: string };
};
```

---

## 8) Async & Error Handling

- Prefer RTK Query for async data and error states.
- Always surface errors through typed error models.
- Avoid swallowing errors; return or throw typed errors explicitly.
- Use `try/catch` only at boundaries (services, adapters, or UI handlers).
- Do not use `console.log` in production-ready code.
