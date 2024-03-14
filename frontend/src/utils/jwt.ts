function base64UrlDecode(input: string): string {
  let replaced = input.replace(/-/g, '+').replace(/_/g, '/');
  switch (replaced.length % 4) {
    case 0:
      break;
    case 2:
      replaced += '==';
      break;
    case 3:
      replaced += '=';
      break;
    default:
      throw new Error('Invalid token');
  }
  return decodeURIComponent(
    atob(replaced)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
}

export function getJwtExpiration(token: string): number | null {
  const parts = token.split('.');

  if (parts.length !== 3) {
    throw new Error('Invalid JWT token');
  }
  try {
    const payload = JSON.parse(base64UrlDecode(parts[1]));

    if (!payload.exp || typeof payload.exp !== 'number') {
      return null;
    }
    return payload.exp;
  } catch (error) {
    return null;
  }
}
