import { prisma } from "../app";

type TTodoCreate = { title: string; description: string };
type TTodoUpdate = { _id: string; title: string; description: string; status?: string };

export default class TodoRepo {
  // CREATE
  static async createTask(data: TTodoCreate) {
    try {
      const newTodo = await prisma.todo.create({
        data: {
          title: data.title,
          description: data.description,
        },
      });
      return newTodo;
    } catch (error) {
      return Promise.reject("Failed to create task.");
    }
  }

  // READ (All tasks)
  static async getAllTasks() {
    try {
      return await prisma.todo.findMany({
        orderBy: { createdAt: 'desc' } // Sorts tasks so the newest appear first
      });
    } catch (error) {
      return Promise.reject("Failed to retrieve tasks.");
    }
  }

  // UPDATE
  static async update(data: TTodoUpdate) {
    try {
      const updatedTodo = await prisma.todo.update({
        where: { id: data._id },
        data: {
          title: data.title,
          description: data.description,
          status: data.status,
        },
      });
      return updatedTodo;
    } catch (error) {
      return Promise.reject("Invalid task id or task does not exist.");
    }
  }

  // DELETE
  static async delete(_id: string) {
    try {
      await prisma.todo.delete({
        where: { id: _id },
      });
      return Promise.resolve("Successfully deleted task.");
    } catch (error) {
      return Promise.reject("Invalid task id or task does not exist.");
    }
  }
}