const attempts = new Map<string, { count: number; expiresAt: number }>();

export function consumeRateLimit(key: string, max = 20, windowMs = 60000) {
  const now = Date.now();
  const existing = attempts.get(key);
  if (!existing || existing.expiresAt <= now) {
    attempts.set(key, { count: 1, expiresAt: now + windowMs });
    return { allowed: true };
  }
  if (existing.count >= max) return { allowed: false };
  existing.count += 1;
  attempts.set(key, existing);
  return { allowed: true };
}
