// Init Sequelize and connect to DB
import { Sequelize, DataTypes } from "sequelize";
const sequelize = new Sequelize(
 'dev-dedale_serverapi',
 'dev-dedale_serverapi',
 '@qs4xX9h@W.UIlR2',
  {
    host: '147.135.130.132',
    dialect: 'mysql'
  }
);
sequelize.authenticate().then(async () => {
  console.log('Connection has been established successfully.');
  // await sequelize.sync({ force: true });
console.log('All models were synchronized successfully.');
}).catch((error: string) => {
  console.error('Unable to connect to the database: ', error);
});
export default sequelize;