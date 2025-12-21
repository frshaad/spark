export function sanitizeName(name: string) {
  return name.trim().replace(/\s+/g, ' ');
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}
