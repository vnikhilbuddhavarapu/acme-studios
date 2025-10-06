// src/worker/lib/turnstile.ts
import type { Env } from '../types'

type VerifyRes = { success: boolean; ['error-codes']?: string[] }

export async function verifyTurnstile(env: Env, token: string, ip?: string): Promise<boolean> {
  if (!env.TURNSTILE_SECRET_KEY) return false
  // Cloudflare dummy secret → always pass in dev
  if (env.TURNSTILE_SECRET_KEY === '1x0000000000000000000000000000000AA') return true

  const body = new URLSearchParams({
    secret: env.TURNSTILE_SECRET_KEY,
    response: token,
    remoteip: ip ?? ''
  })

  const resp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body
  })
  if (!resp.ok) return false

  const data = (await resp.json()) as VerifyRes
  return !!data.success
}
