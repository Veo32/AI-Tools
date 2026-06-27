# Security Checklist

Implemented in the scaffold:

- JWT access and refresh tokens.
- Session storage with hashed refresh tokens.
- Secure headers through Helmet and Next.js headers.
- CSRF protection for non-webhook API routes.
- XSS sanitization pipe for incoming API strings.
- Prisma parameterized queries for SQL injection prevention.
- Role-based guards for admin, moderator, editor, and vendor workflows.
- API key hashing and scoped developer access.
- Rate limiting through Nest Throttler.
- Device tracking schema.
- Optional 2FA fields in the user model.
- Audit logs for auth, moderation, webhooks, and admin workflows.

Before live launch:

- Enforce HTTPS-only cookies and HSTS at the edge.
- Add raw-body verification for all payment webhooks.
- Connect a real email provider for verification, password resets, and security alerts.
- Add GDPR export/delete endpoints and consent tracking screens.
- Run dependency scanning, SAST, DAST, and container image scanning in CI.
- Add CAPTCHA or proof-of-work to public submission endpoints if spam appears.

