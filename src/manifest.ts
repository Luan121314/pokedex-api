export default {
    database:{
        database: process.env.DATABASE_NAME ||"test",
        port: 3306,
        host: process.env.DATABASE_HOST || "localhost",
        username: process.env.DATABASE_USERNAME || "root",
        password: process.env.DATABASE_PASSWORD || null
    }
}