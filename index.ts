require('dotenv').config();
import express from 'express';
import cors from 'cors';
import usersRoutes from './presentation/routes/userRoutes';
import eventsRoutes from './presentation/routes/eventsRouter';
import ordersRoutes from './presentation/routes/ordersRouter';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/examen/api/v1/users', usersRoutes);
app.use('/examen/api/v1/events', eventsRoutes);
app.use('/examen/api/v1/orders', ordersRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});