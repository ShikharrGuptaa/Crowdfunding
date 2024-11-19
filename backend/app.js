require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const paymentRoutes = require("./routes/paymentRoutes")
const contributionRoutes = require("./routes/contributionRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");


const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);



app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

// Connecting to db
connectDB();

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use('/payments', paymentRoutes);
app.use("/contributions", contributionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
