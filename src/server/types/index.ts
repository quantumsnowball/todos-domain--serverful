export interface User {
  email: string,
  hashedPassword: string
}

export interface TokenPayload {
  id: number,
  user: string
}
