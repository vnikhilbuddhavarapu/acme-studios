// src/worker/types.ts
export interface Env {
    DB: D1Database
    SESSIONS: KVNamespace
    TURNSTILE_SECRET_KEY: string
    TURNSTILE_SITE_KEY: string
    JWT_SECRET: string
    RESEND_API_KEY: string
    RESEND_FROM?: string
    RESEND_TO?: string
}
  