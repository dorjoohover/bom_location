import {config} from 'dotenv'

config()
export default () => {
    return {
        database: {
            
        },
        mongo_url: process.env.MONGO_URL || '',
        mongo_db_name: process.env.MONGO_DBNAME
    }
}