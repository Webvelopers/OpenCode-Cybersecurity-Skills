# Cyber Kill Chain References

Target version: public Lockheed Martin Cyber Kill Chain model.

Last verified: 2026-09-08.

Pinning rationale: The Cyber Kill Chain is a public stage-based model rather than a frequently versioned technical catalog. Use official Lockheed Martin material for stage definitions and use ATT&CK or D3FEND for detailed TTP or countermeasure mapping.

## Official Sources

- Lockheed Martin Cyber Kill Chain: https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html
- MITRE ATT&CK for TTP detail: https://attack.mitre.org
- MITRE D3FEND for countermeasures: https://d3fend.mitre.org

## Scope Notes

Use this skill for stage-based attack path communication, defensive breakpoint analysis, and response planning. Use ATT&CK for detailed technique IDs and D3FEND for countermeasure engineering.

## ID Conventions

- Stages are named: Reconnaissance, Weaponization, Delivery, Exploitation, Installation, Command and Control, Actions on Objectives.
- If IDs are needed, use ATT&CK IDs for adversary techniques and D3FEND IDs for countermeasures rather than inventing Kill Chain IDs.

## Validation Guidance

Validate stage placement by adversary objective, not by tool name alone. Ensure outputs remain defensive and do not describe tactical execution steps.
