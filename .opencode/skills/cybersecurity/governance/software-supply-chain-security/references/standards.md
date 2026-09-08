# Software Supply Chain Security References

Target versions: NIST SP 800-218, SLSA v1.2, OpenSSF Scorecard, SPDX, CycloneDX.

Last verified: 2026-09-08.

Pinning rationale: These sources are current public references for secure software development, build provenance, open source project posture, and SBOM representation. Use later versions only when the user asks for latest or when a formal requirement mandates them.

## Official Sources

- NIST SP 800-218 SSDF: https://csrc.nist.gov/pubs/sp/800/218/final
- SLSA specification: https://slsa.dev/spec/v1.2/
- SLSA source: https://github.com/slsa-framework/slsa
- OpenSSF Scorecard: https://github.com/ossf/scorecard
- OpenSSF Scorecard Action: https://github.com/ossf/scorecard-action
- SPDX: https://spdx.dev/
- CycloneDX: https://cyclonedx.org/
- OSV: https://osv.dev/

## Scope Notes

Use this skill for secure development lifecycle, supply chain risk, source control, CI/CD, build, artifact, release, SBOM, dependency, and provenance assessment. Use `vulnerability-risk-prioritization` when prioritizing specific CVEs or weaknesses.

## ID Conventions

- SSDF practices use identifiers such as `PO`, `PS`, `PW`, and `RV` families.
- SLSA levels and tracks should include version and level, such as `SLSA v1.2 Build L3`.
- OpenSSF Scorecard checks should use official check names, such as `Token-Permissions`, `Pinned-Dependencies`, and `Branch-Protection`.
- SBOM references should specify format and version when known, such as SPDX or CycloneDX.

## Validation Guidance

Validate claims against repository configuration, CI/CD workflow files, release artifacts, attestations, signatures, SBOM files, and package registry metadata. Do not infer signed release or provenance guarantees without evidence.
