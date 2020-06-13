const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const { contactRouter } = require("./Contacts/contact.router");
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: "*",
};

const runServer = async () => {
  const app = express();
  try {
    await mongoose.connect(process.env.DB_URI, { useUnifiedTopology: true });
    console.log("Database connection successful");

    app.use(cors(corsOptions));
    app.use(morgan("combined"));
    app.use(express.json());
    app.use("/contacts", contactRouter);

    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT} port`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runServer();
