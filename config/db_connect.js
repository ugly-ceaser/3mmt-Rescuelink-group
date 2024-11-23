const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.mongo_uri;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(uri , {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
