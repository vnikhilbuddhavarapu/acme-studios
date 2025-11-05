import { jwtVerify } from 'jose'
import type { Env } from '../types'

export type SessionInfo = { userId: string; jti: string } | null

export async function readSession(env: Env, cookieHeader: string | null): Promise<SessionInfo> {
  if (!cookieHeader) return null
  const m = /(?:^|;\s*)sid=([^;]+)/.exec(cookieHeader)
  if (!m) return null
  const token = decodeURIComponent(m[1])
  const key = new TextEncoder().encode(env.JWT_SECRET)
  try {
    const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] })
    const jti = String(payload.jti ?? '')
    if (!jti) return null
    const sess = await env.SESSIONS.get(`sess:${jti}`, 'json') as { userId: string; exp: number } | null
    if (!sess) return null
    return { userId: String(sess.userId), jti }
  } catch {
    return null
  }
}
