import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import registrationRoutes from "./routes/user.registration.routes.js";
import loginRoutes from "./routes/login.routes.js";
import webinarRoutes from "./routes/webinar.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

app.use("/registration", registrationRoutes);
app.use("/login",loginRoutes);
app.use("/webinar",webinarRoutes);
app.use("/feedback",feedbackRoutes);

app.get("/",(req,res)=>{
    res.send("Webinar Management is running");
})

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
   console.log(`Server is running on http://localhost:${PORT}`);
})

