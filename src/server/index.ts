import dotenv from 'dotenv'
import app from './app'


dotenv.config()
const port_server = process.env.PORT_SERVER || 3000


app.listen(port_server, () => {
  console.log(`Express server listening on port ${port_server}`)
})

