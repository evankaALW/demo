const seque = require('../config/db');
const {DataTypes}= require('sequelize');




const clickerTable = seque.define('clickerTable', {
  clickerSerialNo: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true,
      indexes: [{ unique: false, fields: ['clickerSerialNo'] }],
    },
    seatNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
      indexes: [{ unique: false, fields: ['seatNumber'] }],
    },
    clickerMacAddress: {
      type: DataTypes.STRING,
      
      // Add an index to the clickerMacAddress column
      indexes: [{ unique: false, fields: ['clickerMacAddress'] }],
    },
  },
  {
    // options
    tableName: 'clickerTable' // specify the exact table name
  });
  
seque.sync().then(() =>{
    console.log("clickerTable table successfully created")
}).catch((error) =>{
    console.log("Error while creating brandTable", error)
});


module.exports = clickerTable;

