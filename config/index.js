require('dotenv').config()

module.exports = {
    PORT: process.env.PORT || 3000,
    DATABASE: process.env.DATABASE || 'mongodb://localhost:27017/backvsfront'
}