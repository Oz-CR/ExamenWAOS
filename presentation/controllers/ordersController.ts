import { Request, Response } from 'express';
import Order from '../../infrastructure/db/models/Order';
import User from '../../infrastructure/db/models/User';
import Event from '../../infrastructure/db/models/Event';
import dotenv from 'dotenv';
import twilioController from './twilioController';
import stripeController from './stripeController';

dotenv.config();

const makeOrder = async (req: Request, res: Response) => {
    const {user_id, event_id, ticket_quantity} = req.body;

    const user = await User.findOne({ where: { id: user_id } });
    const event = await Event.findOne({ where: { id: event_id } });

    if (!user || !event) {
        res.status(400).json({ message: 'User or event not found' });
        return;
    } else {
        try {
            const total_price = ticket_quantity * event.ticket_price;
            const seat = Math.floor(Math.random() * 100);
            const order = await Order.create({
                user_id,
                event_id,
                ticket_quantity,
                total_price,
                seat: 'A' + seat.toString(),
                status: 'Completed',
                createdAt: new Date(),
                updatedAt: new Date()
            });
            const paymentIntent = await stripeController.createStripePaymentIntent(total_price, order.id);
            if (!paymentIntent) {
                res.status(500).json({ message: 'Error creating payment intent'});
                return;
            } else {
                const payment_id = paymentIntent.id;
                await Order.update({ payment_id }, { where: { id: order.id } });
                await twilioController.sendMessage(`Order created successfully. Amount: $${order.total_price} MXN Seat: ${order.seat}`, user.phone_number);
                res.status(201).json({ message: 'Order created successfully', order });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error creating order', error });
            return;
        }
    }
}

const cancelOrderAndGetRefund = async (req: Request, res: Response) => {
    const {order_id} = req.body;
    const order = await Order.findOne({ where: { id: order_id } });
    const user = await User.findOne({ where: { id: order.user_id } });
    if (!order) {
        res.status(400).json({ message: 'Order not found' });
        return;
    } else {
        try {
            const refund = await stripeController.refundStripePaymentIntent(order_id);
            if (!refund) {
                res.status(500).json({ message: 'Error cancelling order'});
                return;
            } else {
                await Order.update({ status: 'Canceled' }, { where: { id: order_id } });
                await twilioController.sendMessage(`Order cancelled successfully. Amount: $${order.total_price} MXN`, user.phone_number);
                res.status(200).json({ message: 'Order cancelled successfully', order });
            }
        }catch (error) {
            res.status(500).json({ message: 'Error cancelling order', error });
            return;
        }
    }
}

export default {
    makeOrder,
    cancelOrderAndGetRefund
}