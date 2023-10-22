const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());

const url = "mongodb://127.0.0.1:27017/contactManagementSystem";
const port = 3000;
app.use(express.json());

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const conn = mongoose.connection;

//app.get('/',()=>{console.log('Hello World')});

//user routers
app.use("/users", require("./routes/userRoute"));

//contact routers
app.use("/contact", require("./routes/contactRoute"));

conn.on("error", () => {
  console.log("Error");
});

conn.on("open", () => {
  console.log("Connection established");
});

app.listen(port, () => {
  console.log(`listening on port number ${port} `);
});
