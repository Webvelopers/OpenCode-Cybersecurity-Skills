# MITRE ATT&CK Detection References

Target version: v19.1.

Last verified: 2026-09-08.

Pinning rationale: ATT&CK v19.1 is the repository's current target version for ATT&CK-based mapping and detection work. Use official ATT&CK site content or `attack-stix-data` when exact IDs are required.

## Official Sources

- MITRE ATT&CK: https://attack.mitre.org
- ATT&CK versions: https://attack.mitre.org/resources/versions/
- Detection strategies: https://attack.mitre.org/detectionstrategies/
- Analytics: https://attack.mitre.org/analytics/
- Data sources: https://attack.mitre.org/datasources/
- Data components: https://attack.mitre.org/datacomponents/
- ATT&CK STIX 2.1 data: https://github.com/mitre-attack/attack-stix-data

## Scope Notes

Use this skill for detection engineering, threat hunting, telemetry mapping, SIEM/EDR/NDR coverage, cloud and identity detection, and false-positive analysis. Use `mitre-attack-v19` for broader behavior-to-TTP mapping.

## ID Conventions

- ATT&CK tactics use identifiers such as `TA0001`.
- ATT&CK techniques use identifiers such as `T1059`.
- ATT&CK sub-techniques use identifiers such as `T1059.001`.
- Data sources and data components should use official ATT&CK names when available.
- Analytics and detection strategies should cite official IDs or names only after validation.

## Validation Guidance

Validate that detections are tied to observable behavior and required data sources. Avoid mapping detections only by tool, malware family, or actor name. Confirm exact IDs against official ATT&CK resources when precision matters.
