import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import gameRoutes from './routes/gameRoutes.js';
import questionRoutes from './routes/questionRoutes.js';

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//database
mongoose.connect(process.env.MONGODB_URL);
  
mongoose.connection.on('connected', () => {
    console.log('Database is connected');
});
  
mongoose.connection.on('error', (err) => {
    console.log('Error occurred in connecting database:', err);
});


//routes
app.get('/', (req,res)=>{
    res.send('get request');
});

app.use('/auth', authRoutes);
app.use('/game', gameRoutes);
app.use('/question', questionRoutes);


//server
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Server has started on port: ${port}`);
});