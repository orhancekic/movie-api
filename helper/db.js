const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost:27017/movie-api');
    mongoose.connection.on('open', () => {
        console.log('MongoDB: Conntected')
    });
    mongoose.connection.on('error', (err) => {
        console.log('MongoDB: Connection Error')
    });
}