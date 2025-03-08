// Init Sequelize and connect to DB
import { Sequelize } from 'sequelize';
import express from 'express';

const app = express();

const sequelize = new Sequelize(
  String(process.env.DB_NAME),
  String(process.env.DB_LOGIN),
  String(process.env.DB_PASSWD),
  {
    host: String(process.env.CLUSTER_ADDR),
    dialect: 'mariadb',
    logging: app.get('env') === 'development',
  }
);
sequelize
  .authenticate()
  .then(async () => {
    console.log('Connection has been established successfully.');
    // Execute if mode = development
    if (app.get('env') === 'development') {
      await sequelize.sync({ force: false }).finally(() => {
        console.log('All models were synchronized successfully.');
      });
    }
  })
  .catch((error: unknown) => {
    if (error instanceof Error) console.error('Erreur:', error.message);
    else console.error('Erreur inconnue:', error);
  });
export default sequelize;
