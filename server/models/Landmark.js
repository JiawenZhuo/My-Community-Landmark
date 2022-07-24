
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Comment = new Schema(
    {
        user: { type: String, required: true },
        comment: { type: String, required: true }
    },
    { timestamps: true },
)


const Landmark = new Schema(
    {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
        comments: {type: [Comment]}
    },
    { timestamps: true },
)

module.exports = mongoose.model('comment',Comment);

module.exports = mongoose.model('landmark', Landmark);