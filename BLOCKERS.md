# Known Blockers & External Dependencies (BLOCKERS.md)

| Item | Status | Impact | Safe Alternative / Workaround Implemented |
|---|---|---|---|
| **Live Razorpay Webhook Signatures** | External Setup Needed | Cannot receive real webhook calls on localhost without public tunnel | Provided deterministic test signature generator & unit tests for HMAC verification; demo mode simulates successful transition with audit ledger |
| **Resend / SMTP Live Sending** | External Credential Optional | Real emails should not be dispatched in test/demo mode | Built local outbox preview and synthetic delivery queue with deduplication and suppression list |
| **Official Gov Scraping Access** | External Network Limits | Many government exam portals (NTA, UPSC) enforce CAPTCHAs and strict anti-scraping | Implemented synthetic official notice fixtures with hash verification and manual document intake pipeline |
| **Minor Consent Legal Review** | Policy Review Required | Minor accounts under 18 require parental consent under DPDP Act 2023 | Feature-gated `MINOR_ONBOARDING_ENABLED=false` by default for live; provided synthetic guardian consent ledger for demo testing |
