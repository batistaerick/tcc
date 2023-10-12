export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPassword(password: string): boolean {
  return /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{7,}$/.test(password);
}

export function isValidUsername(username: string): boolean {
  return /^[A-Za-z0-9-_]{1,30}$/.test(username);
}

export function arePasswordsEqual(
  newPassword: string | undefined,
  confirmPassword: string | undefined
): boolean {
  return newPassword === confirmPassword;
}

export function hasValueInside(data: object): boolean {
  return (Object.keys(data) as (keyof typeof data)[]).some((key) => {
    return (
      data[key] !== null &&
      data[key] !== undefined &&
      String(data[key]).length !== 0
    );
  });
}
