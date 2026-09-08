---
name: software-supply-chain-security
description: "Software supply chain, SSDF, SLSA, OpenSSF, SBOM: Use when assessing secure development, build provenance, dependencies, CI/CD, release integrity, or artifact trust."
license: MIT
metadata:
  framework: "NIST SSDF, SLSA, OpenSSF Scorecard, SBOM"
  target_version: "NIST SP 800-218, SLSA v1.2, OpenSSF Scorecard, SPDX/CycloneDX"
  source: "https://csrc.nist.gov/pubs/sp/800/218/final and https://slsa.dev"
  domain: "cybersecurity"
  subdomain: "software-supply-chain"
  tags: "software-supply-chain,ssdf,slsa,openssf,sbom,ci-cd"
  version: "0.0.3"
  author: "Webvelopers, Inc."
---

# Software Supply Chain Security

Use this skill to assess secure software development, dependency governance, CI/CD integrity, artifact provenance, release trust, and SBOM readiness.

## When to Use

- When reviewing source control, dependencies, package manifests, CI/CD workflows, build systems, releases, provenance, or artifact integrity.
- When the user asks about NIST SSDF, SLSA, OpenSSF Scorecard, SBOM, SPDX, CycloneDX, OSV, dependency update automation, or signed releases.
- When assessing vendor, open source, package, container, model, or build pipeline trust.
- When a finding involves supply chain compromise, malicious dependency risk, CI/CD token exposure, unpinned actions, or missing provenance.

## Framework Scope

Target versions and sources: NIST SP 800-218 SSDF, SLSA v1.2, OpenSSF Scorecard checks, SPDX, and CycloneDX SBOM guidance.

This skill covers preventive and detective controls for software supply chain risk. It complements `owasp-appsec` for application defects, `nist-cyber-risk` for governance, `cis-hardening` for secure configuration, and `vulnerability-risk-prioritization` for vulnerability triage.

Core areas:

| Area | Examples |
|---|---|
| Source integrity | Branch protection, code review, signed commits, protected tags, contributor trust |
| Build integrity | Hermetic or isolated builds, CI token scope, pinned actions, reproducibility, provenance |
| Dependency hygiene | Lockfiles, update automation, known vulnerabilities, abandoned packages, package confusion |
| Artifact trust | Signed releases, attestations, SBOM, checksums, registry controls, promotion gates |
| Governance | Secure SDLC policies, supplier requirements, evidence, exception handling, review cadence |

## Workflow

1. Identify source repositories, package ecosystems, CI/CD workflows, build systems, artifact registries, deployment targets, and release process.
2. Map secure development practices to SSDF functions and practices: prepare, protect, produce, and respond.
3. Assess build and provenance posture against SLSA requirements for source, build, dependencies, provenance, and verification.
4. Assess OpenSSF Scorecard-style signals such as branch protection, token permissions, pinned dependencies, SAST, dependency update tooling, security policy, and signed releases.
5. Review SBOM readiness, dependency inventory, license metadata, vulnerability sources, and artifact distribution controls.
6. Prioritize gaps by ability to prevent tampering, detect compromise, reduce blast radius, and produce repeatable evidence.

## Output Format

| Field | Expected content |
|---|---|
| Supply chain area | Source, build, dependency, artifact, release, or governance area |
| Evidence | Workflow, manifest, lockfile, release, package, registry, policy, or config |
| Framework mapping | SSDF practice, SLSA requirement, OpenSSF check, SBOM control, or related source |
| Risk | Tampering, dependency compromise, provenance gap, token abuse, artifact substitution, or audit gap |
| Recommendation | Defensive control and implementation owner |
| Validation | Safe check, CI assertion, policy test, attestation verification, or evidence artifact |
| Residual risk | Remaining trust assumption or exception |

## Verification

- Recommendations distinguish policy, technical control, evidence, and verification.
- CI/CD guidance avoids exposing secrets or changing production workflows without review.
- Dependency findings use authoritative sources and consider exploitability, reachability, and exposure.
- Provenance and SBOM recommendations name producer, consumer, and verification point.

## Official Sources

- https://csrc.nist.gov/pubs/sp/800/218/final
- https://slsa.dev/spec/v1.2/
- https://github.com/ossf/scorecard
- https://github.com/ossf/scorecard-action
- https://spdx.dev/
- https://cyclonedx.org/
- https://osv.dev/

## Safety Limits

Keep work defensive. Do not provide dependency confusion execution steps, malicious package instructions, CI/CD secret theft guidance, signing key abuse, or bypass procedures.
