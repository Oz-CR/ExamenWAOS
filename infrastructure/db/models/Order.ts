import {  DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

interface OrderAttributes {
    id: number;
    user_id: number;
    event_id: number;
    ticket_quantity: number;
    total_price: number;
    seat: string;
    status: string;
    payment_id: string;
    createdAt: Date;
    updatedAt: Date;
}

class Order extends Model<OrderAttributes> {
    id!: number;
    user_id!: number;
    event_id!: number;
    ticket_quantity!: number;
    total_price!: number;
    seat!: string;
    status!: string;
    payment_id!: string;
    createdAt!: Date;
    updatedAt!: Date;
}

Order.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ticket_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },        
    seat: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    payment_id: {
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
    tableName: 'orders',
    modelName: 'Order',
});

export default Order;