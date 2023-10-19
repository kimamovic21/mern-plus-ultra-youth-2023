// const express = require('express');
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import bugRoutes from './routes/bug.routes.js';

const app = express(); 
const PORT = 4000;

app.use(cors({
  origin: "http://localhost:3000",
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/auth', authRoutes);
app.use('/bugs', bugRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/bug-report')
    .then(() => console.log('Connected to Database'))
    .catch(()=>console.error("Could not connect"));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
