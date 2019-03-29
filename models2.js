const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', {
  dialect: 'mysql',
  host: "http://localhost:",
  port: 3005,
})

class User extends Model {}
User.init({
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
}, { sequelize });

sequelize.sync()
  .then(() => User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  }))
  .then(jane => {
    console.log(jane.toJSON());
  });
