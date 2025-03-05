import {  DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    phone_number: string;
    role: string;
    token: string;
    createdAt: Date;
    updatedAt: Date;
}

class User extends Model<UserAttributes> {
    id!: number;
    name!: string;
    email!: string;
    password!: string;
    phone_number!: string;
    role!: string;
    token!: string;
    createdAt!: Date;
    updatedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: 'Client | Admin',
        allowNull: false,
        defaultValue: 'Client',
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
});

export default User;