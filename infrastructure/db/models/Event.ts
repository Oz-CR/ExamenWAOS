
import {  DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

interface EventAttributes {
    id: number;
    event_name: string;
    description: string;
    start_date: Date;
    end_date: Date;
    location: string;
    ticket_price: number;
    createdAt: Date;
    updatedAt: Date;
}

class Event extends Model<EventAttributes> {
    id!: number;
    event_name!: string;
    description!: string;
    start_date!: Date;
    end_date!: Date;
    location!: string;
    ticket_price!: number;
    createdAt!: Date;
    updatedAt!: Date;
}

Event.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    event_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ticket_price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
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
    tableName: 'events',
    modelName: 'Event',
});

export default Event;  