//
// Server Private Keys Generator
//
// run this script by node, copy the output and paste into `.env` file.
const crypto = require('crypto')


const fields = ['ACCESS_TOKEN_SECRET', 'REFRESH_TOKEN_SECRET']

fields.forEach(field => {
  const secret = crypto.randomBytes(64).toString('hex')
  console.log(`${field}=${secret}`)
})
