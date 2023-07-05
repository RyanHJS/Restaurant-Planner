const express = require("express");
const cors = require("cors");
const app = express();

console.log("Starting Server...");


app.get("/", (req, res) => {
  const databaseName = "world";
  res.send(`hello ${databaseName}` + '3')
})

const testRoute = require('./api/routes/testRoute')
app.use('/test', testRoute)


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server listening on ${PORT}`));
