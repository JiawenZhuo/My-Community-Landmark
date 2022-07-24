
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db')
const app = express();
const landmarkRouter = require('./router/landmark-router');

const apiPort = 8000;
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use('/api', landmarkRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))