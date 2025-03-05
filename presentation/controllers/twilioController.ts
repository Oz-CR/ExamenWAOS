import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID as string, process.env.TWILIO_AUTH_TOKEN as string);
const twilioNumber = process.env.TWILIO_PHONE_NUMBER as string;

const sendMessage = async (messageBody: string, sendTo: string) => {
    try {
        const message = await twilioClient.messages.create({
            body: messageBody,
            from: twilioNumber,
            to: sendTo
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default {
    sendMessage
}