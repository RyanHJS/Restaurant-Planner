const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "http://localhost:3000",
      "http://127.0.0.1:80",
    ],
  })
);

console.log("Starting Server...");

app.get("/", (req, res) => {
  const databaseName = "world";
  res.send(`hello ${databaseName}` + "3");
});

const testRoute = require("./api/routes/testRoute");
const googleMapsRoute = require("./api/routes/googleMapsRoute");
app.use("/test", testRoute);
app.use("/api/googleMaps", googleMapsRoute);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server listening on ${PORT}`));
