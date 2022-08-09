import jwt from 'jsonwebtoken'
import { User } from './types'


//
// dev dummy simulation
//
export const userIsAuthorized = (email: string, password: string, users: User[]) =>
    users.some(user => user.email === email && user.password == password)

export const userAlreadyExists = (email: string, users: User[]) =>
    users.some(user => user.email === email)


// JWT helpers
export const signAccessToken = (payload: any) => {
    const accessToken = jwt.sign(
        { ...payload }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' })
    const refreshToken = jwt.sign(
        { ...payload }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '5m' })
    return { accessToken, refreshToken }
}

