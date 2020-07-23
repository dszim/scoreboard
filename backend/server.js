const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.MONGO;

mongoose.connect(uri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection works you fool");
});

app.use(cors());
app.use(express.json())

app.listen(port, () => console.log(`Server is listening on port: ${port}`));

// routes
/**
 * index
 */
app.get('/', function(req, res){ 
    res.sendStatus(200);
});

/**
 * /contributors
 * /contributors/:id
 * /contributors/totalmeters
 */ 
const contributorRouter = require('./routes/contributorRouter');
app.use('/contributors', contributorRouter);