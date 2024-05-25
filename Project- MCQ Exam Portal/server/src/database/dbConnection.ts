import mongoose from 'mongoose'
import config from 'config'

const db_connection = {
    host: config.get('db_config.host'),
    port: config.get('db_config.port'),
    db_name: config.get('db_config.db_name')
}

const connectionString: string = `mongodb://${db_connection.host}:${db_connection.port}/${db_connection.db_name}`
const connectDB = async () => {
    try {
        const connect = await mongoose.connect(connectionString)
        console.log(`Database Connected On DBname: ${connect.connection.name}`);
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

export default connectDB