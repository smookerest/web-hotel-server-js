const Sequelize = require('sequelize')
const UserModel = require('../src/models/Users')
const RoomModel = require('../src/models/rooms')
const BookDetailModel = require('../src/models/bookdetails')
const CostumerModel = require('../src/models/costumers')
const BookingModel = require('../src/models/booking')
//Configurando la Base De Datos

const sequelize = new Sequelize('SomethingNew', 'postgres', 'letmein', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false
})

const User = UserModel(sequelize, Sequelize)
const Room = RoomModel(sequelize, Sequelize)
const BookDetail = BookDetailModel(sequelize, Sequelize)
const Costumer = CostumerModel(sequelize, Sequelize)
const Booking = BookingModel(sequelize, Sequelize)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  
sequelize.sync()
  .then(() => {
    console.log(`Database & tables created!`)
  })

  module.exports = {
    User, Room, BookDetail, Costumer, Booking, Sequelize
  }