import { Request, Response } from "express";
import Joi from "joi";
import TodoSvc from "../services/todo.service";
import { TodoStatus } from "../generated/prisma";

export default class TodoCtrl {
  static async createTask(req: Request, res: Response) {
    const { title, description } = req.body;

    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().optional(),
    });

    const { error } = schema.validate({ title, description });
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    try {
      const result = await TodoSvc.createTask({ title, description });
      return res.status(201).json({ message: result });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async getAll(_req: Request, res: Response) {
    try {
      const result = await TodoSvc.getAllTasks();
      return res.json({ message: result });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async getById(req: Request, res: Response) {
    const _id = Number(req.params.id);

    try {
      const result = await TodoSvc.getTaskById(_id);
      return res.json({ message: result });
    } catch (error) {
      return res.status(404).json({ message: error });
    }
  }

  static async update(req: Request, res: Response) {
    const { title, description, status } = req.body;
    const _id = Number(req.params.id);

    const schema = Joi.object({
      title: Joi.string().optional(),
      description: Joi.string().optional(),
      status: Joi.string()
        .valid(...Object.values(TodoStatus))
        .optional(),
    }).min(1); 

    const { error } = schema.validate({ title, description, status });
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    try {
      const result = await TodoSvc.update({ _id, title, description, status });
      return res.json({ message: result });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async delete(req: Request, res: Response) {
    const _id = req.params.id as string;

    try {
      const result = await TodoSvc.delete(_id);
      return res.json({ message: result });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}