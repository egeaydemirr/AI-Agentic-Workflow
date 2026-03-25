---
name: Mobile Release Readiness
description: Validates Android/iOS release readiness, version/changelog consistency, and release notes quality.
on:
  workflow_dispatch:
  push:
    branches: [main]
strict: true
engine:
  id: copilot
  agent: merge-coordinator
permissions:
  contents: read
  pull-requests: read
  issues: read
  actions: read
network:
  allowed:
    - defaults
    - node
    - github
tools:
  github:
    toolsets: [repos, pull_requests, issues]
  bash:
    - node
    - npm
    - jq
    - git
    - grep
safe-outputs:
  staged: true
  create-issue:
    title-prefix: "[release-readiness] "
    labels: [automation, mobile, release]
    max: 1
  add-comment:
    target: "*"
    max: 1
---

# Mobile Release Readiness Gate

You are the release readiness coordinator for this React Native repository.

## Goal

Validate release readiness for both platforms:

1. Android and iOS version consistency checks
2. `CHANGELOG.md` freshness and semantic completeness
3. Release note quality (what changed, risk, rollback note)
4. Outstanding blocker scan from open PR/issue context

## Deterministic checks

Run and summarize results:

- `node --version`
- `npm --version`
- `cat package.json | jq '.version'`
- `grep -n "version" app.json || true`
- `grep -n "CFBundleShortVersionString\|CFBundleVersion" ios/KocMobileArchitecture/Info.plist || true`
- `grep -n "versionName\|versionCode" android/app/build.gradle || true`
- `git log --oneline -n 20`

## Output

Produce one structured summary with:

1. `Release Verdict`: READY / READY WITH CONDITIONS / NOT READY
2. `Version Matrix`: package/app/ios/android values and drift status
3. `Changelog`: present/missing/incomplete items
4. `Risk & Rollback`: top risks and rollback prerequisites
5. `Release Actions`: blocking checklist with owners

If verdict is `NOT READY`, request creating one issue using safe outputs with details and blockers.
