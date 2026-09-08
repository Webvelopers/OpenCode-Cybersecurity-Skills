# MITRE Fight Fraud Framework References

Target version: v1.1.

Last verified: 2026-09-08.

Pinning rationale: MITRE F3 v1.1 is the repository's current target version for repeatable fraud TTP mapping. Validate exact IDs against the public F3 site or v1.1 STIX bundle.

## Official Sources

- MITRE F3 website: https://ctid.mitre.org/fraud
- F3 repository: https://github.com/center-for-threat-informed-defense/fight-fraud-framework
- F3 v1.1 STIX bundle: https://github.com/center-for-threat-informed-defense/fight-fraud-framework/blob/main/public/f3-stix-v1.1.json
- F3 matrix: https://ctid.mitre.org/fraud/#/matrix

## Scope Notes

Use F3 when a cyber event turns into financial fraud, account takeover, payment abuse, BEC, mule activity, card fraud, refund abuse, KYC abuse, or monetization.

## ID Conventions

- Fraud-specific techniques use `F1XXX` IDs.
- Reused ATT&CK techniques use `T1XXX` IDs.
- F3-specific tactics include `FA0001` Positioning and `FA0002` Monetization.

## Validation Guidance

Keep fraud analysis defensive. Validate exact IDs against the v1.1 STIX bundle before formal reporting.
