const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const cors = require('cors');
const morgan = require("morgan");
const { contactRouter } = require("./contacts.router");
const PORT = process.env.PORT || 3001;

const corsOptions ={
  origin: '*'
}

const app = express();
app.use(cors(corsOptions));
app.use(morgan("combined"));
app.use(express.json());

app.use("/contacts", contactRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} port`);
});
