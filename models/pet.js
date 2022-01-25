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
        image : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true,
                isUrl : true
            }
        }
    });
    return Pet;
}