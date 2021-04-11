import manifest from "./src/manifest";
const {
    database,
    host,
    password,
    port,
    username
} = manifest.database;

const ormConfig = {
    type: "mysql",
    database,
    host,
    password,
    port,
    username,
    synchronize: true,
    logging: false,
    entities: [
        "./src/models/**.ts"
    ],
    migrations: [
        "./src/database/migrations/**.ts"
    ],
    cli: {
        "migrationsDir": "./src/database/migrations"
    }
}

export default ormConfig;