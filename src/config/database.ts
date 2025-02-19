// Init Sequelize and connect to DB
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.development' });


const sequelize = new Sequelize(
  process.env.DB_NAME ?? '',
  process.env.DB_LOGIN ?? '',
  process.env.DB_PASSWD ?? '',
  {
    host: process.env.CLUSTER_ADDR ?? '',
    dialect: 'mysql',
  }
);
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    // await sequelize.sync({ force: true });
    // await sequelize.sync();
    console.log('All models were synchronized successfully.');
  })
  .catch((error: unknown) => {
    if (error instanceof Error) {
      console.error('Erreur:', error.message);
    } else {
      console.error('Erreur inconnue:', error);
    }
  });
export default sequelize;
