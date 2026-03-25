# WCAG 2.2 Mobile AA Checklist (New/Changed UI)

Use this checklist for screens/components touched in the current change set.

## A. Semantics and Operability

- [ ] Every interactive element has meaningful `accessibilityRole`.
- [ ] Every interactive element has meaningful `accessibilityLabel`.
- [ ] Additional `accessibilityHint` is provided when action is ambiguous.
- [ ] Disabled/loading states are announced (`accessibilityState`).
- [ ] Focus order is logical for screen reader traversal.

## B. Perceivability

- [ ] Text and essential UI controls meet AA contrast intent.
- [ ] Information is not conveyed by color alone.
- [ ] Dynamic updates are announced when needed.

## C. Touch and Input

- [ ] Tap targets are at least 44x44pt.
- [ ] Inputs have associated labels and error messaging.
- [ ] Error messages are understandable and recoverable.

## D. Navigation and Consistency

- [ ] Screen title/landmark context is clear to assistive tech.
- [ ] Repeated controls keep consistent naming and behavior.

## E. i18n and Content

- [ ] Accessibility labels/hints support localization.
- [ ] No hardcoded user-facing strings for accessibility text.

## F. Evidence

- [ ] Automated checks added where feasible (RN Testing Library assertions).
- [ ] Manual checks documented for non-automatable criteria.
- [ ] Open exceptions include risk and follow-up issue.
