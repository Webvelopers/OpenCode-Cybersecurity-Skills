# MITRE ATT&CK References

Target version: v19.1.

Last verified: 2026-09-08.

Pinning rationale: ATT&CK v19.1 is the repository's target version for repeatable adversary behavior mapping. Use official ATT&CK site content or `attack-stix-data` for exact ID validation.

## Official Sources

- MITRE ATT&CK: https://attack.mitre.org
- Version history: https://attack.mitre.org/resources/versions/
- Enterprise tactics: https://attack.mitre.org/tactics/enterprise/
- STIX data: https://github.com/mitre-attack/attack-stix-data
- MITRE CTI archive: https://github.com/mitre/cti

## Scope Notes

Use Enterprise by default unless the assessment scope explicitly requires Mobile or ICS. Treat ATT&CK mappings as behavioral mappings, not tool-name mappings.

## ID Conventions

- Tactics use `TA####` IDs.
- Techniques use `T####` IDs.
- Sub-techniques use `T####.###` IDs.

## Validation Guidance

Validate exact IDs and technique names against the target version or official STIX data before using them as authoritative report references.
