require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT ;


app.use(express.json());
app.use(cors());

const { DB_connect } = require("./app/db/db");
const UserRouter = require("./app/routes/userRoutes");
const eventRouter = require("./app/routes/eventRoutes");
const bookingRouter = require("./app/routes/bookingRoutes");
const paymentRouter = require("./app/routes/paymentRoutes");
const JwtRouter = require("./app/routes/jwtRouter");

DB_connect();

app.use("/users", UserRouter);
app.use("/events", eventRouter);
app.use("/bookings", bookingRouter);
app.use("/payments", paymentRouter);
app.use("/jwt", JwtRouter);

app.get("/", (req, res) => {
  res.send("server running ");
});

app.listen(port, () => {
  console.log(`RadiumCommunityServer listening on port ${port}`);
});
