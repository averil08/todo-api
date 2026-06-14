import { TodoStatus } from "../generated/prisma";

export type TTodo = {
  title: string;
  description?: string;
  userId?: number;
};

export type TTodoUpdateOptions = {
  _id: number;
  title?: string;
  description?: string;
  status?: TodoStatus;
};