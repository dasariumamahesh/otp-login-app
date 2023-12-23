const express = require("express");
const app = express();
const routes = require('./routes/routes');
require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/', routes);

app.listen(port, async ()=> {
    console.log(`Listening on port: ${port}`);
})