# TODO

Legend: [ ] pending | [-] on process | [x] completed

## Cybersecurity Findings Remediation Plan

- [x] 1. High: Replace the `cybersecurity` agent bash denylist with a deny-by-default read-only allowlist.
- [x] 2. Medium: Add minimal GitHub Actions token permissions with `contents: read`.
- [x] 3. Medium: Pin first-party GitHub Actions to commit SHA references instead of mutable tags.
- [x] 4. Medium: Add automated dependency update coverage for GitHub Actions and `.opencode` npm dependencies.
- [x] 5. Medium: Add a high-severity npm audit check for `.opencode/package-lock.json` in CI.
- [x] 6. Medium: Make the project OpenCode schema deny unexpected top-level config keys.
- [x] 7. Low: Strengthen validation so agent bash permissions are checked semantically and deny-by-default ordering is enforced.
- [x] 8. Low: Update `scaffold-skill.js` so generated skills match required sections and reference metadata.
- [x] 9. Low: Clarify private security reporting guidance and validation requirements in project docs.
- [x] 10. Run unit tests and repository validation after remediation.
