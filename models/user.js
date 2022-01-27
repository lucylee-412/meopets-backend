// model for users

module.exports = (sequelize, DataTypes) =>  {
    const User = sequelize.define('user', {
        id : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull : false,
            primaryKey : true
        },
        email : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true,
                isEmail : true
            }
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        money : {
            type : DataTypes.INTEGER,
            defaultValue: 300
        }
    });
    return User;
}