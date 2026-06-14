import { TTodo, TTodoUpdateOptions } from "../models/todo.model";
import TodoRepo from "../repositories/todo.repository";
import { TodoStatus } from "../generated/prisma";

export default class TodoSvc {
  static createTask(task: TTodo) {
    return TodoRepo.createTask(task);
  }

  static getAllTasks(userId: number) {
    return TodoRepo.getAllTasks(userId);
  }

  static getTaskById(_id: number) {
    return TodoRepo.getTaskById(_id);
  }

  static update(task: TTodoUpdateOptions) {
    if (task.status && !Object.values(TodoStatus).includes(task.status)) {
      return Promise.reject(
        `Invalid status. Valid values: ${Object.values(TodoStatus).join(", ")}`
      );
    }
    return TodoRepo.update(task);
  }

  static delete(_id: string) {
    return TodoRepo.delete(_id);
  }
}