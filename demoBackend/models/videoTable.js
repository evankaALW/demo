const {DataTypes}= require('sequelize');
const seque = require('../config/db');
//saved as videoTables in database
const videoTable = seque.define('videoTable', {
  videoID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  dateAndTime: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  videoURL: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  adStartTime: {
    type: DataTypes.INTEGER,
    defaultValue:0,
  },
  duration : {
    type: DataTypes.INTEGER,
    defaultValue:0,
  },
  videoType: {
    type: DataTypes.STRING(200),
    allowNull: false,
  }
});




seque.sync().then(() => {
  console.log('videoTable table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

module.exports = videoTable;