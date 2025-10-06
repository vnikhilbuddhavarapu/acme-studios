// src/worker/lib/jwt.ts
import { SignJWT, jwtVerify, type JWTPayload } from 'jose'

export type SessionClaims = JWTPayload & {
  jti: string
  sub: string // userId
  locale?: string
}

export async function signSession(userId: string, secret: string, ttlSeconds: number, locale?: string) {
  const jti = crypto.randomUUID()
  const key = new TextEncoder().encode(secret)
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds
  const token = await new SignJWT({ jti, sub: userId, locale })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(exp)
    .sign(key)
  return { token, jti, exp }
}

export async function verifySession(token: string, secret: string): Promise<SessionClaims> {
  const key = new TextEncoder().encode(secret)
  const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] })
  return payload as SessionClaims
}
