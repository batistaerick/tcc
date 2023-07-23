export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPassword(password: string): boolean {
  return /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{7,}$/.test(password);
}

export function isValidUsername(username: string): boolean {
  return /^[A-Za-z0-9-_]{1,30}$/.test(username);
}
