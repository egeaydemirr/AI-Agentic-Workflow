---
description: 'Update documentation when React Native code changes'
applyTo: '**/*.{md,ts,tsx,js,jsx,json,gradle,xml,plist,yaml,yml}'
---

Koc Mobil - Update Docs on RN Code Change

Scope

- Keeps documentation aligned with React Native code changes.
- Applies to app code, config, native build files, and docs.

Out of scope

- Release notes for external stakeholders.
- CI/CD pipeline documentation.

1. When to Update Docs
   Update docs if changes include:

- New features or user-facing behavior changes.
- New or changed API endpoints, request/response shapes, or error models.
- New or changed environment variables.
- New native capabilities, permissions, or build settings.
- Dependency upgrades that change usage or requirements.
- Breaking changes or deprecations.

2. What to Update
   Minimum targets:

- README.md (setup, usage, feature overview).
- docs/ (feature docs, API docs, configuration guides).
- .env.example (if a new env var is added).
- CHANGELOG.md (if present, for user-visible changes).

3. RN-Specific Triggers

- Android/iOS build changes (Gradle, Xcode, plist) require setup updates.
- New permissions require docs for user rationale and platform configs.
- New navigation routes require updated route lists and param docs.

4. Quality Rules

- Keep docs concise and accurate.
- Ensure code examples compile and match current APIs.
- Do not leave stale screenshots or outdated instructions.
- Prefer linking to canonical docs instead of duplicating content.

5. Minimal Checklist

- README reflects current setup and usage.
- New env vars are documented in .env.example.
- API or feature changes are documented.
- Breaking changes have a short migration note.
