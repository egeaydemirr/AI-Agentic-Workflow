---
description: 'Environment rules and dependency standards (Koç Mobil)'
applyTo: '**/*'
---

Koc Mobil - Environment and Dependencies

Scope

- Defines environment rules, dependency standards, and build/infra notes.
- Applies to all React Native projects using Koc Mobil architecture.

Out of scope

- Product-specific secrets or operational procedures.

1. Environment Rules
   We use

- react-native-config
- .env, .env.dev, .env.uat
- Android productFlavors
- iOS schemes

Requirements

- Use environment variables via a config wrapper.
- Do not hardcode environment URLs.
- Do not expose secrets in the repo.
- Keep environment-specific values in the correct .env file.

2. Dependency Standards
   The canonical list of mandatory libraries is defined in
   [.github/instructions/architecture.md](.github/instructions/architecture.md).

Rules

- Do not introduce alternative libraries for the same purpose without justification.
- Prefer ecosystem-standard packages that align with architecture rules.
- Keep dependencies minimal; remove unused packages promptly.

3. Build and Infra Notes

- Ensure environment files are loaded via react-native-config in native builds.
- Android build variants must map to .env files consistently.
- iOS schemes must map to .env files consistently.
- Avoid committing generated build artifacts.
