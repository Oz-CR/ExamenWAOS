import Stripe from 'stripe';
import dotenv from 'dotenv';
import Order from '../../infrastructure/db/models/Order';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const createStripePaymentIntent = async (amount: number, orderId: number) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'MXN',
            payment_method_types: ['card'],
            customer: 'cus_RnzNplcmKiuMIR',
            payment_method: 'pm_1QyeyCC6lJGZEwlfpBb4G8nT',
            metadata: {
                order_id: orderId
            }
        });

        const confirmPaymentIntent = await stripe.paymentIntents.confirm(paymentIntent.id);
        return paymentIntent;
    } catch(error) {
        console.log(error);
        return;
    }
}

const refundStripePaymentIntent = async (orderId: number) => {
    const order = await Order.findOne({ where: { id: orderId } });
    if (!order) {
        return;
    } else {
        const paymentIntentId = await stripe.paymentIntents.retrieve(order.payment_id);
        const refund = stripe.refunds.create({
            payment_intent: paymentIntentId.id,
        })
        return refund;
    }
}

export default {
    createStripePaymentIntent,
    refundStripePaymentIntent
}