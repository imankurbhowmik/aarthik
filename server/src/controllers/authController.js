import User from "../models/User.models.js";
import jwt from "jsonwebtoken";
import Category from "../models/Category.models.js";
import Source from "../models/Source.models.js";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });

    await Category.create({
      user: user._id,
      name: "Miscellaneous"
    });

    await Source.create({
      user: user._id,
      name: "General"
    });

    res.status(201).json({
    user: {
    _id: user._id,
    name: user.name,
    email: user.email,
  },
  token: generateToken(user._id),
});


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const existingCategory = await Category.findOne({ user: user._id });
    if (!existingCategory) {
      await Category.create({
        user: user._id,
        name: "Miscellaneous",
      });
    }

    const existingSource = await Source.findOne({ user: user._id });
    if (!existingSource) {
      await Source.create({
        user: user._id,
        name: "General",
      });
    }

    res.status(200).json({
    user: {
    _id: user._id,
    name: user.name,
    email: user.email,
  },
  token: generateToken(user._id),
});

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
