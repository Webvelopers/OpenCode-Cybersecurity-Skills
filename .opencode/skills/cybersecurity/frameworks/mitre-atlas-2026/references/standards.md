# MITRE ATLAS References

Target version: 2026.07.

Last verified: 2026-09-08.

Pinning rationale: ATLAS publishes monthly content versions and separate data format versions. This repository targets content version 2026.07 for repeatable analysis unless the user asks for the latest ATLAS content.

## Official Sources

- MITRE ATLAS: https://atlas.mitre.org
- ATLAS data repository: https://github.com/mitre-atlas/atlas-data
- Release manifest: https://raw.githubusercontent.com/mitre-atlas/atlas-data/main/dist/manifest.yaml
- Changelog: https://raw.githubusercontent.com/mitre-atlas/atlas-data/main/CHANGELOG.md
- OWASP GenAI Security Project: https://genai.owasp.org/

## Scope Notes

Use ATLAS for threats against AI systems, including predictive AI, generative AI, RAG, agentic AI, AI tools, model artifacts, datasets, and AI supply chain components. Use `owasp-genai-security` for OWASP GenAI Top 10 application risk framing.

## ID Conventions

- Tactics use `AML.TA####` IDs.
- Techniques use `AML.T####` IDs.
- Sub-techniques use `AML.T####.###` IDs.
- Mitigations use `AML.M####` IDs.
- Case studies use `AML.CS####` IDs.

## Validation Guidance

Validate exact IDs against `dist/v6/ATLAS-2026.07.yaml` or the official ATLAS site before using them as authoritative references.
