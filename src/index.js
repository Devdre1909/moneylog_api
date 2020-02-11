const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const creditRoute = require('./routes/credit.route');

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`);
    next();
});

app.use(creditRoute);
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Sever started on ${PORT}`);
});
