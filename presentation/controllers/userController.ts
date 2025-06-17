import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../infrastructure/db/models/User';
import { validateEmail } from '../controllers/validations';
import sendMessage from '../controllers/twilioController';

const registerClient = async(req: Request, res: Response) => {
    const { name, email, password, phone_number } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        res.status(400).json({ message: 'User already exists' });
        return;
    } else {
        try {
            if (validateEmail(email)) {
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = await User.create({
                name,
                email,
                phone_number,
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date()
                });

                res.status(201).json({ message: 'User created successfully!', user });
            } else {
                res.status(400).json({ message: 'Invalid email format' });
                return;
            }
        } catch (error) {
            res.status(500).json({ message: 'Error creating user', error });
            return;
        }
    }
}

const registerAdmin = async (req: Request, res: Response) => {
    const { name, email, password, phone_number } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        res.status(400).json({ message: 'User already exists' });
        return;
    } else {
        try {
            if (validateEmail(email)) {
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = await User.create({
                name,
                email,
                phone_number,
                password: hashedPassword,
                role: 'Admin',
                createdAt: new Date(),
                updatedAt: new Date()
                });

                res.status(201).json({ message: 'User created successfully!', user });
            } else {
                res.status(400).json({ message: 'Invalid email format' });
                return;
            }
        } catch (error) {
            res.status(500).json({ message: 'Error creating user', error });
            return;
        }
    }
}

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
        res.status(400).json({ message: 'User not found' });
        return;
    } else {
        try {
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                res.status(400).json({message: 'Incorrect password'});
                return;
            } else {
                const userToken = jwt.sign({ id:user.id, role:user.role }, process.env.JWT_SECRET_KEY!, {
                    expiresIn: '1h'
                });
                const updateUser = await User.update({ token: userToken }, { where: { id: user.id } });
                //const SMS = await sendMessage.sendMessage(`Welcome ${user.name}! You have logged in successfully! If it wasn't you, please contact us. 🗣️`, user.phone_number);
                //if (!SMS) {
                //    res.status(500).json({ message: 'Error sending SMS' });
                //    return;
                //}
                res.status(200).json({ message: 'Logged in successfully!', userToken });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error authenticating user', error });
            return;
        }
    }
}

const sendCustomMessage = async (req: Request, res: Response) => {
    const { message_body, user_id } = req.body;
    try {
        const user = await User.findOne({ where: { id: user_id } });
        if (!user) {
            res.status(400).json({ message: 'User not found' });
            return;
        } else {
            const SMS = await sendMessage.sendMessage(message_body, user.phone_number);
            if (!SMS) {
                res.status(500).json({ message: 'Error sending SMS' });
               return;
            } else {
                res.status(200).json({ message: 'Message sent successfully!' });
            }
        }
    } catch (error) {
        res.status(500).json({ message: 'Error sending message', error });  
        return;
    }
}

export default {
    registerClient,
    registerAdmin,
    login,
    sendCustomMessage
}