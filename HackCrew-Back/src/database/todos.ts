import mongoose from "mongoose";
import { TodoModel } from "../models/todo";

export async function createTodo({
  userId,
  teamId,
  task,
  status,
  dueDate,
  description,
}: {
  userId: string;
  teamId: string;
  task: string;
  status: string;
  dueDate?: string;
  description?: string;
}) {
  return await TodoModel.create({
    userId,
    teamId,
    task,
    status,
    dueDate,
    description,
  });
}

export async function getTodosByUserIdAndTeamId(
  userId: string,
  teamId: string
) {
  return await TodoModel.find({
    userId: new mongoose.Types.ObjectId(userId),
    teamId: new mongoose.Types.ObjectId(teamId),
  });
}
export async function getTodosByTeamId(teamId: string) {
  return await TodoModel.find({
    teamId: new mongoose.Types.ObjectId(teamId),
  });
}

// ✅ Get Todo by ID
export async function getTodoById(todoId: string) {
  return await TodoModel.findById(new mongoose.Types.ObjectId(todoId));
}

// ✅ Update Todo
export async function updateTodo(
  todoId: string,
  {
    task,
    status,
    dueDate,
  }: {
    task: string;
    status: string;
    dueDate?: string;
  }
) {
  return await TodoModel.findByIdAndUpdate(
    new mongoose.Types.ObjectId(todoId),
    {
      task,
      status,
      dueDate,
    },
    { new: true } // Return the updated document
  );
}

// ✅ Delete Todo
export async function deleteTodo(todoId: string) {
  return await TodoModel.findByIdAndDelete(new mongoose.Types.ObjectId(todoId));
}
export async function getTodosByStatus(
  userId: string,
  teamId: string,
  status: string
) {
  return await TodoModel.find({
    userId: new mongoose.Types.ObjectId(userId),
    teamId: new mongoose.Types.ObjectId(teamId),
    status,
  });
}
