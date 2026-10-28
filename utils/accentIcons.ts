// Normalize an accent-icon setting into a list of Iconify names. Accepts a
// single name ("carbon:rocket"), a comma-separated string, or an array.
export function parseIconList(raw: unknown): string[] {
  if (!raw) return []
  const arr = Array.isArray(raw) ? raw : String(raw).split(',')
  return arr.map(s => String(s).trim()).filter(Boolean)
}
