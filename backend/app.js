const express = require('express');
const connectDb = require('./config/db');
const cors = require('cors');
require('dotenv').config(); 
const authRoutes = require('./routes/authRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const notificationRoutes =  require('./routes/notificationRoutes')
const departmentRoutes = require('./routes/departmentRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();
app.use(cors());
connectDb(); 

app.use(express.json()); 

app.use('/api/auth',authRoutes);
app.use('/api/feedback',feedbackRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/reports', reportRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');    
});




app.listen(8080, () => {
    console.log(`Server is running on http://localhost:8080`);
});
