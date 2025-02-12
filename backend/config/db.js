const mongoose = require('mongoose');
const  connectDb = async () => { 
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (err) {   
        console.error(`Error: ${err.message}`);
    }
};

module.exports = connectDb;

