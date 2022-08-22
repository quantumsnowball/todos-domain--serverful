import { Token } from "../types"


export const renewToken = async (url: string, refreshToken: Token) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken })
  })
  if (res.status === 200) {
    return true
  } else {
    console.log(await res.json())
    return false
  }
}
