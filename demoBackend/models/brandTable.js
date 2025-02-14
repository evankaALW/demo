const {DataTypes} = require("sequelize")
const seque = require('../config/db')


const brandTable = seque.define('brandTable', {
    brandID:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    brandName:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    brandLogo:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    contactPersonName:{
        type:DataTypes.STRING,
    },
    contactPersonPhone:{
        type:DataTypes.BIGINT,
        allowNull:true,
        defaultValue:0,
    }
});

seque.sync().then(() =>{
    console.log("brandTable table successfully created")
}).catch((error) =>{
    console.log("Error while creating brandTable", error)
});


module.exports = brandTable;
