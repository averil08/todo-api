import { prisma } from "../prisma";
import { TTodo, TTodoUpdateOptions } from "../models/todo.model";
import { TodoStatus } from "../generated/prisma";

export default class TodoRepo {
  static async createTask(data: TTodo) {
    try {
      const newTodo = await prisma.todo.create({
        data: {
          title: data.title,
          description: data.description,
          userId: data.userId!,
        },
      });
      return newTodo;
    } catch (error) {
      console.error("createTask error:", error);
      return Promise.reject("Failed to create task.");
    }
  }

  static async getAllTasks(userId: number) {
    try {
      return await prisma.todo.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });
    } catch (error) {
      return Promise.reject("Failed to retrieve tasks.");
    }
  }

  static async getTaskById(_id: number) {
    try {
      const todo = await prisma.todo.findUnique({
        where: { id: _id },
      });
      if (!todo) return Promise.reject("Task not found.");
      return todo;
    } catch (error) {
      return Promise.reject("Invalid task id or task does not exist.");
    }
  }

  static async update(data: TTodoUpdateOptions) {
    try {
      const updatedTodo = await prisma.todo.update({
        where: { id: data._id },
        data: {
          title: data.title,
          description: data.description,
          status: data.status,
          completedAt:
            data.status === TodoStatus.DONE
              ? new Date()
              : data.status !== undefined
              ? null
              : undefined,
        },
      });
      return updatedTodo;
    } catch (error) {
      return Promise.reject("Invalid task id or task does not exist.");
    }
  }

  static async delete(_id: string) {
    try {
      await prisma.todo.delete({
        where: { id: Number(_id) },
      });
      return "Successfully deleted task.";
    } catch (error) {
      return Promise.reject("Invalid task id or task does not exist.");
    }
  }
}