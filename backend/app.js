const express = require("express");
const cors = require("cors");
const app = express();

// app.use(
//   cors({
//     origin: [
//       "http://localhost:8080",
//       "http://localhost:3000",
//       "http://127.0.0.1:80",
//     ],
//   })
// );

console.log("Starting Server...");

app.get("/", (req, res) => {
  const databaseName = "world";
  res.send(`hello ${databaseName}` + "3");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const testRoute = require("./api/routes/testRoute");
const googleMapsRoute = require("./api/routes/googleMapsRoute");
const usersRoute = require("./api/routes/usersRoute");
const votingRoute = require("./api/routes/votingRoute");
const eventsRoute = require("./api/routes/eventsRoute");

app.use("/test", testRoute);
app.use("/api/googleMaps", googleMapsRoute);
app.use("/api/users", usersRoute);
app.use("/api/vote", votingRoute);
app.use("/api/events", eventsRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server listening on ${PORT}`));
