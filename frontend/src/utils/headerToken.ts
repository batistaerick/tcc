export function buildHeadersAuthorization(token: string = '') {
  return { headers: { Authorization: `Bearer ${token}` } };
}

export function buildAuth(email: string = '', password: string = '') {
  return { auth: { username: email, password: password } };
}
