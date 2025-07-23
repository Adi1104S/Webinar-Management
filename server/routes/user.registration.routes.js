import express from "express";
import bcrypt from "bcryptjs"
import User from "../models/user.js";

const router = express.Router();

router.post('/', async(req,res)=>{
  try{
    const { name, email, password, role} = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Name, email, password and role are required' });
    }
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || 'user',
    });
    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        bio: newUser.bio,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "name email role"); // Only select necessary fields
    res.status(200).json({ users });
  } catch (error) {
    console.error("Failed to fetch users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const { id } = req.params;

    const updatedFields = { name, email: email?.toLowerCase(), role };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedFields.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        bio: updatedUser.bio,
      },
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;