const mongoose = require('mongoose');

const uri = "mongodb+srv://Joyce:123Joyceoma%40%23@clustero.ugq1w.mongodb.net/?retryWrites=true&w=majority&appName=ClusterO"

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
