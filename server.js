const server = require("./index");
const { sequelize } = require("./models");

server.listen(process.env.PORT || 3000, async () => {
  console.log("Hello");
  await sequelize.sync();
});
