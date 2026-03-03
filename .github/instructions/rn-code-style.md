---
description: 'React Native code style standards (Koç Mobil)'
applyTo: '**/*.ts, **/*.tsx'
---

Koc Mobil - React Native Code Style

Scope

- Defines code style standards for React Native projects.
- Applies to all .ts and .tsx files.

Out of scope

- Project-specific lint configuration details.

1. General Style

- Keep files small and focused.
- Avoid deep nesting; prefer early returns.
- Prefer explicit, readable code over cleverness.
- Keep functions single-purpose.

2. Exports and Imports

- Use ES Modules only.
- Use named exports only (no default exports).
- Avoid circular dependencies.
- Do not import across features directly.
- Keep module boundaries aligned with folder structure.

3. Formatting and Structure

- Keep props and params lists readable; wrap when needed.
- Prefer object and array literals over chained mutations.
- Avoid overly long lines; break complex expressions.
- Use consistent ordering of imports: external, internal, relative.

4. Strings and UI Text

- Do not hardcode UI strings.
- Use i18n resources for all user-facing text.
- Keep string keys stable and scoped.

5. Styling

- Do not hardcode colors or font sizes.
- Use theme tokens for colors, typography, and shadows.
- Keep inline styles minimal; prefer shared style objects.

6. Logging and Debugging

- No console.log in production-ready code.
- Use approved logging utilities if needed.
- Remove temporary debug statements before merge.

7. Comments

- Use comments sparingly.
- Prefer self-explanatory code.
- Add brief comments only for complex or non-obvious logic.
