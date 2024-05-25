const {DataTypes}= require('sequelize');
const seque = require('../config/db');
const clickerTable = require('./clickerTable');


const userData = seque.define('userData', {
userID:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
},
userName:{
    type: DataTypes.STRING(200),
    allowNull: false,
},
phoneNumber:{
    type: DataTypes.BIGINT,
    allowNull: false,
},
cardID:{type: DataTypes.STRING(200),//change it back to bigint later
    allowNull: false,
},
dateAndTime: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  clickerSerialNo:{
    type:DataTypes.INTEGER,
  }
});

userData.belongsTo(clickerTable, { foreignKey: 'clickerSerialNo' , onUpdate: 'NO ACTION',
onDelete: 'CASCADE'});

    seque.sync().then(() => {
    console.log('userData table created successfully!');
  }).catch((error) => {
    console.error('Unable to create table : ', error);
  });

module.exports = userData;