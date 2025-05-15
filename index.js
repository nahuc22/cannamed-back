const app = require("./src/app");
const {sequelize, connect} = require("./src/db")

app.listen(3001, async () => {
    await sequelize.sync({ alter: true});
});

connect();