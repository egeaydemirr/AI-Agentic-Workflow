---
description: 'React Native review and quality checklist'
applyTo: '**/*'
---

React Native Review / Quality Checklist

Pre-commit (local)

- Lint passes: yarn lint
- Tests pass: yarn test (if test scope exists)
- TypeScript has no errors (VS Code Problems or tsc if configured)
- App builds and runs on at least one platform (ios or android)

Architecture compliance

- Feature isolation respected (no cross-feature imports)
- API calls go through RTK Query (no direct fetch/axios in components)
- Shared layer has no feature-specific logic
- Theming rules respected (no hardcoded colors or font sizes)
