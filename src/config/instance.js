import { Sequelize } from "sequelize";
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_TYPE,
    logging: false,
    port: process.env.DB_PORT,
  }
);

export default sequelize;
