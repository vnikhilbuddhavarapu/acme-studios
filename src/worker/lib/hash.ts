export async function genSalt(bytes = 16): Promise<string> {
    const salt = crypto.getRandomValues(new Uint8Array(bytes))
    return btoa(String.fromCharCode(...salt))
  }
  
  export async function pbkdf2(password: string, saltB64: string, iters = 100_000): Promise<string> {
    const enc = new TextEncoder()
    const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits'])
    const salt = Uint8Array.from(atob(saltB64), c => c.charCodeAt(0))
    const bits = await crypto.subtle.deriveBits(
      { name: 'PBKDF2', hash: 'SHA-256', salt, iterations: iters },
      key,
      256
    )
    const hash = new Uint8Array(bits)
    return btoa(String.fromCharCode(...hash))
  }
  
  export async function hashPassword(password: string): Promise<{ hash: string; salt: string }> {
    const salt = await genSalt()
    const hash = await pbkdf2(password, salt)
    return { hash, salt }
  }
  
  export async function verifyPassword(password: string, salt: string, expectedHash: string): Promise<boolean> {
    const hash = await pbkdf2(password, salt)
    return hash === expectedHash
  }
  