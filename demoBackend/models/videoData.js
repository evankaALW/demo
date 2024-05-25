const {DataTypes}= require('sequelize');
const seque = require('../config/db');
const videoTable = require('./videoTable');
const brandTable = require('./brandTable');

const videoData = seque.define('videoData', {
  videoDataID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  dateAndTime: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  questionTypeID: {
    type: DataTypes.INTEGER,
    defaultValue:0,
  },
  questionDesc: {
    type: DataTypes.STRING(200),
  },
  videoID: {
    type: DataTypes.INTEGER,
  },
  totalOptionNumber:{
    type:DataTypes.INTEGER,
    defaultValue:0,//added manually in workbench after the table was created
  },
  optionOne: {
    type: DataTypes.STRING(200),
  },
  optionTwo: {
    type: DataTypes.STRING(200),
  },
  optionThree: {
    type: DataTypes.STRING(200),
  },
  optionFour: {
    type: DataTypes.STRING(200),
  },
  optionFive: {
    type: DataTypes.STRING(200),
  },
  imageName: {
    type: DataTypes.STRING(200),
  },
  imageURL: {
    type: DataTypes.STRING(200),
  },
  displayToggle: {
    type: DataTypes.TEXT('medium'),
  },
  correctOption:{
    type:DataTypes.STRING(200),
  },
  userResponseToggle: {  
    type: DataTypes.TEXT('medium'),
  },
  padX:{
    type:DataTypes.STRING,
  },
  padY:{
    type:DataTypes.STRING,
  },
  font:{
    type:DataTypes.STRING,
  },
  x:{
    type:DataTypes.STRING,
  },
  y:{
    type:DataTypes.STRING,
  },
  colours:{
    type:DataTypes.STRING,
  },
  brandID:{
    type:DataTypes.INTEGER,
  },
  brandName:{
    type:DataTypes.STRING,
  }
});

videoData.belongsTo(videoTable, { foreignKey: 'videoID' });
videoData.belongsTo(brandTable, { foreignKey: 'brandID'});


seque.sync().then(() => {
  console.log('videoData table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

module.exports = videoData;