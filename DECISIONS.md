# Architectural Decisions Log (DECISIONS.md)

### ADR 001: Maintain Single Coherent Next.js Application
- **Decision**: Extend the existing Next.js App Router application in-place. Do not create a separate app or alter working CBSE question bank functionality.
- **Rationale**: The prompt mandates preserving the owner's uncommitted work and existing implementation, keeping one modular monolith.

### ADR 002: Dual-Mode Architecture (DEMO vs LIVE)
- **Decision**: Provide zero-credential immediate demonstration capability via `APP_MODE=demo` backed by client/session synthetic stores, while keeping full database and third-party provider adapters for `APP_MODE=live`.
- **Rationale**: Enables instant verification without requiring live external secrets, while preserving production database integration paths.

### ADR 003: Deterministic Rule Evaluation over Generative AI for Core Logic
- **Decision**: All eligibility checking, cutoff calculations, pricing, marks, and revision schedules are strictly evaluated by typed TypeScript code rather than prompt-based LLM generation.
- **Rationale**: Ensures zero hallucinations, mathematically verifiable outputs, and 100% compliance with official exam rules.

### ADR 004: Strict Privacy Boundaries for Wellness (Mind Coach)
- **Decision**: Mind Coach reflections and check-ins are stored in an isolated data store/table with strict RLS and are never exposed to parents, counselors, or advertisers.
- **Rationale**: Mandatory safeguarding and ethical requirements for student well-being.
