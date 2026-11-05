import User from "../models/User.js";
import { signToken } from "../utils/token.js";

const publicUser = (u) => ({ id: u._id, name: u.name, email: u.email, role: u.role });

export async function register(req, res) {
  const { name, email, password } = req.body || {};
  if ([name, email, password].some((v) => typeof v !== "string" || !v.trim()))
    return res.status(400).json({ message: "Name, email and password are required" });
  if (password.length < 6)
    return res.status(400).json({ message: "Password must be at least 6 characters" });

  const user = await User.create({ name, email, password }); // role is never taken from the client
  res.status(201).json({ token: signToken(user._id), user: publicUser(user) });
}

export async function login(req, res) {
  const { email, password } = req.body || {};
  if (typeof email !== "string" || typeof password !== "string")
    return res.status(400).json({ message: "Email and password are required" });

  const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ message: "Invalid email or password" });

  res.json({ token: signToken(user._id), user: publicUser(user) });
}

export function me(req, res) {
  res.json({ user: publicUser(req.user) });
}
