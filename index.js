const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;
require('./startup/connection')();
const userrout = require('./routs/userrout');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use('/user', userrout);
app.listen(port, () => console.log(`Listening on port:- ${port}`))