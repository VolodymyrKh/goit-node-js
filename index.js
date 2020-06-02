
const express = require("express");
const morgan = require("morgan");
const {contactRouter} = require('./contacts.router')
const PORT = 3000;


const app = express();
app.use(morgan("combined"));
app.use(express.json());

app.use('/contacts', contactRouter)


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} port`);
});
