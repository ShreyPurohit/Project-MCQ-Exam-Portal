import app from './app'
import config from 'config'

const port = config.get('server_config.port')
const host = config.get('server_config.host')

app.listen(port, () => {
    console.log(`Server Running On Port http://${host}:${port}`);
})
