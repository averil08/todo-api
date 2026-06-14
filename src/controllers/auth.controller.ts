import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma";
import Joi from "joi";

const JWT_SECRET = process.env.JWT_SECRET!;

export default class AuthCtrl {
  static async signup(req: Request, res: Response) {
    const schema = Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { firstname, lastname, email, password } = req.body;

    try {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) return res.status(409).json({ message: "Email already in use." });

      const hashed = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { firstname, lastname, email, password: hashed },
      });

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

      return res.status(201).json({ token, user: { id: user.id, email: user.email, firstname: user.firstname } });
    } catch (err) {
      return res.status(500).json({ message: "Signup failed." });
    }
  }

  static async login(req: Request, res: Response) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return res.status(401).json({ message: "Invalid credentials." });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ message: "Invalid credentials." });

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

      return res.json({ token, user: { id: user.id, email: user.email, firstname: user.firstname } });
    } catch (err) {
      return res.status(500).json({ message: "Login failed." });
    }
  }
}