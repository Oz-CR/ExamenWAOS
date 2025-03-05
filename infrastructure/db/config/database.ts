import { Sequelize, Dialect } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_DIALECT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT as unknown as number,
    dialect: DB_DIALECT as unknown as Dialect,
    logging: false,
})

export default sequelize;