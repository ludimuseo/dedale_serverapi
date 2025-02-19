// Init Sequelize and connect to DB
import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";
dotenv.config({ path: ".env.development" });

console.log(process.env.DB_NAME as string);

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_LOGIN as string,
  process.env.DB_PASSWD as string,
  {
    host: process.env.CLUSTER_ADDR as string,
    dialect: 'mysql'
  }
);
sequelize.authenticate().then(async () => {
  console.log('Connection has been established successfully.');
  // await sequelize.sync({ force: true });
  // await sequelize.sync();
console.log('All models were synchronized successfully.');
}).catch((error: string) => {
  console.error('Unable to connect to the database: ', error);
});
export default sequelize;