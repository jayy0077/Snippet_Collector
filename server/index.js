const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const authenticate = require("./middleware/auth");
const snippetRoutes = require("./routes/snippetRoutes");
require("dotenv").config();

app.use(cors({
  origin: "https://snippet-hub-kappa.vercel.app",
  credentials: true
}));
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MOMGODB connected"))
  .catch((err) => console.error("MONGODB connection failed", err));

app.use("/api/snippets", snippetRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on Port:${PORT}`);
});
