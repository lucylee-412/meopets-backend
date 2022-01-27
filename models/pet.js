// model for pets

module.exports = (sequelize, DataTypes) =>  {
    const Pet = sequelize.define('pet', {
        id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull : false,
            primaryKey : true
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true,
            }
        },
        type : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        health : {
            type : DataTypes.INTEGER,
            allowNull : false,
            defaultValue: 50
        },
        hunger : {
            type : DataTypes.INTEGER,
            allowNull : false,
            defaultValue: 50
        },
        happiness : {
            type : DataTypes.INTEGER,
            allowNull : false,
            defaultValue: 50
        },
        fishingxp : {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    });
    return Pet;
}