import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from './types'


//
// dev dummy simulation
//
export const userIsAuthorized = async (email: string, password: string, users: User[]) => {
    const user = users.find(user => user.email === email)
    console.log({ users })
    if (!user)
        return false
    const result = await bcrypt.compare(password, user.hashedPassword)
    console.log({ result })
    return result
}

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

