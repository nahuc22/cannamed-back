import app from './src/app.js';
import { sequelize, connect } from './src/db.js';

app.listen(3001, async () => {
  await sequelize.sync({ alter: true });
});

connect();
