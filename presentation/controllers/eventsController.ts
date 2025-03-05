
import { Request, Response } from 'express';
import Event from '../../infrastructure/db/models/Event';
import { validateDate } from '../controllers/validations';

const getEvents = async (req: Request, res: Response) => {
    try {
        const events = await Event.findAll();
        res.status(200).json({ message: 'Events retrieved successfully', events });
    } catch(error) {
        res.status(500).json({ message: 'Error getting events', error });
        return;
    }
}

const getEventById = async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
        const event = await Event.findByPk(id);
        if (event) {
            res.status(200).json({ message: 'Event retrieved successfully', event });
        } else {
            res.status(404).json({ message: 'Event not found' });
            return;
        }
    } catch(error) {
        res.status(500).json({ message: 'Error getting event', error });
        return;
    }
}

const createEvent = async (req: Request, res: Response) => {
    const { name, description, start_date, end_date, location, ticket_price } = req.body;
    try {
        if (!validateDate(start_date) || !validateDate(end_date)) {
            res.status(400).json({ message: 'Invalid date' });
            return;
        } else {
            const event = await Event.create({
                event_name: name,
                description,
                start_date,
                end_date,
                location,
                ticket_price,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            res.status(201).json({ message: 'Event created successfully', event });
        }
    } catch(error) {
        res.status(500).json({ message: 'Error creating event', error });
        return;
    }
}

const modifyEvent = async (req: Request, res: Response) => {
    const { id, name, description, start_date, end_date, location, ticket_price } = req.body;
    try {
        if (!validateDate(start_date) || !validateDate(end_date)) {
            res.status(400).json({ message: 'Invalid date' });
            return;
        } else {
            const event = await Event.findByPk(id);
            if (event) {
            await event.update({
                event_name: name,
                description,
                start_date,
                end_date,
                location,
                ticket_price
            })
            res.status(200).json({ message: 'Event modified successfully', event });
        } else {
            res.status(404).json({ message: 'Event not found' });
            return;
        }
        }
    } catch(error) {
        res.status(500).json({ message: 'Error modifying event', error });
        return;
    }
}

const deleteEvent = async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
        const event = await Event.findByPk(id);
        if (event) {
            await event.destroy();
            res.status(200).json({ message: 'Event deleted successfully' });
        } else {
            res.status(404).json({ message: 'Event not found' });
            return;
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event', error });
        return;
    }
}

export default {
    getEvents,
    getEventById,
    createEvent,
    modifyEvent,
    deleteEvent
}