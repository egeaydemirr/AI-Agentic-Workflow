# Test Guidance for WCAG 2.2 Mobile AA (React Native)

## Automate When Possible

Recommended assertions with React Native Testing Library:

- Presence and correctness of `accessibilityLabel`
- Presence and correctness of `accessibilityRole`
- `accessibilityState` for disabled/loading/selected states
- Error text visibility and recovery path for form validation

## Manual Verification Needed

- Color contrast decisions against themed UI combinations
- Full screen reader traversal quality and announcements
- End-to-end focus order in complex screens
- Gesture/touch ergonomics across devices

## Suggested Test Matrix (Per Changed Screen)

1. Render semantics check
2. Primary action operability check
3. Error state and feedback check
4. Loading/disabled state announcement check
5. Localization check for accessibility text

## Reporting

Include a short section in test summary:

- Criteria covered by automated tests
- Criteria validated manually
- Remaining exceptions with risk and follow-up
