---
name: Mobile Orchestrator
description: Orchestrates mobile worker workflows using dispatch-workflow safe output.
on:
  workflow_dispatch:
    inputs:
      objective:
        description: "Objective to route (pr-gate, release, triage, all)"
        required: false
        type: string
        default: "all"
strict: true
engine:
  id: copilot
  agent: architecture-planning
permissions:
  contents: read
  issues: read
  pull-requests: read
network:
  allowed:
    - defaults
    - github
tools:
  github:
    toolsets: [repos, issues, pull_requests]
safe-outputs:
  staged: true
  dispatch-workflow:
    workflows: [mobile-pr-gate, mobile-release-readiness, mobile-issue-triage]
    max: 3
  add-comment:
    target: "*"
    max: 1
---

# Mobile Orchestrator

You are the workflow coordinator for mobile operations.

## Goal

Based on `objective` input, decide which worker workflow(s) to dispatch:

- `pr-gate` -> dispatch `mobile-pr-gate`
- `release` -> dispatch `mobile-release-readiness`
- `triage` -> dispatch `mobile-issue-triage`
- `all` or empty -> dispatch all three

## Rules

- Use only allowlisted workflows in `dispatch-workflow`.
- Dispatch at most 3 workflows.
- Add one short comment/summary to the triggering item when context exists.
- If objective is invalid, do not guess; explain supported values.
