
const mongoose = require('mongoose')

const connection_string = "mongodb+srv://Jiawen_Zhuo:Password@cluster0.17adrhc.mongodb.net/?retryWrites=true&w=majority"

mongoose
    .connect(connection_string, { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db;