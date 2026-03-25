# WCAG 2.2 Mobile AA Skill

## Purpose

Provide a single, reusable accessibility standard for React Native UI changes in this repository.

## Scope

- Applies to: **new or changed UI only**
- Target level: **WCAG 2.2 AA (mobile-adapted)**
- Usage mode: **Soft gate** (merge is allowed only with explicit rationale + follow-up for unmet criteria)

## How Agents Use This Skill

- Architecture Planning: plan accessibility requirements and acceptance criteria.
- React Native Developer: implement accessible UI and include evidence.
- Code Reviewer: evaluate findings against this skill checklist.
- Test Writer: add a11y-focused tests for criteria that are testable in RN.
- Merge Coordinator: enforce soft-gate decision and required explanation template.

## Mobile-Adapted Criteria (Core)

1. **Name / Role / Value** for interactive controls
2. **Accessible labels and hints** for actionable UI
3. **Focus order and visibility** for assistive technology navigation
4. **Touch target size** minimum 44x44pt
5. **Color contrast** meets AA intent in app theme usage
6. **Error prevention and recovery cues** in forms
7. **Motion and state feedback** is perceivable and not accessibility-breaking
8. **Localization-safe accessibility text** (no hardcoded user-facing labels)

## Evidence Format

For each screen/component changed, provide:

- Component/screen name
- Criteria checked (pass/fail/na)
- Test evidence (automated/manual)
- Open gaps and mitigation

## Soft Gate Decision Template

Use this in merge/review outputs when there are gaps:

```markdown
## Accessibility Soft Gate

- Result: PASS | PASS WITH EXCEPTIONS | FAIL
- Scope: New/changed UI only
- Criteria not met:
  - [criterion] — [reason]
- Risk level: Low | Medium | High
- Mitigation:
  - [action]
- Follow-up issue:
  - [ticket/link or TODO]
- Owner and target date:
  - [owner] / [date]
```

## References

- [Checklist](./checklist.md)
- [Agent Mapping](./agent-mapping.md)
- [Test Guidance](./test-guidance.md)

## Standard Handoff Prompts (Copy-Paste)

### 1) Planning → Dev

```text
Implement this feature using the architecture plan and WCAG 2.2 Mobile AA skill.

Requirements:
- Scope a11y checks to new/changed UI only
- Apply checklist items from .github/skills/wcag-2-2-mobile-aa/checklist.md
- For each changed screen/component, provide evidence: pass/fail/na + mitigation for gaps
- Use i18n-safe accessibility labels/hints (no hardcoded user-facing text)
```

### 2) Dev → Review

```text
Review this implementation against WCAG 2.2 Mobile AA skill.

Review focus:
- Validate accessibilityRole/accessibilityLabel/accessibilityState coverage on interactive elements
- Check touch targets (44x44pt), contrast intent, error messaging, and focus/navigation behavior
- Limit evaluation to new/changed UI only
- Report findings with severity and include Accessibility Soft Gate summary (PASS / PASS WITH EXCEPTIONS / FAIL)
```

### 3) Review → Merge

```text
Prepare merge readiness with WCAG 2.2 Mobile AA soft gate.

Expected output:
- Include Accessibility Soft Gate section
- If any criterion is unmet, provide mitigation, follow-up issue/TODO, owner, and target date
- Confirm scope is new/changed UI only
```

### 4) Planning → Merge (Fast-Track)

```text
Use this architecture plan to prepare merge checklist readiness, including WCAG 2.2 Mobile AA verification.

Requirements:
- Validate accessibility checklist for new/changed UI
- Include Soft Gate result and exception handling details
- Block only on explicitly high-risk unresolved accessibility issues; otherwise PASS WITH EXCEPTIONS + follow-up
```
