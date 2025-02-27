import { Tracing } from "trace_events";
import {
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
  getTodosByUserIdAndTeamId,
  getTodosByTeamId,
  getTodosByStatus,
} from "../database/todos";
import { Todo } from "../models/todo";
import { getTeamById } from "../database/team";
import { memberIsInTeamService } from "./teams";

export async function createTodoService(
  userId: string,
  teamId: string,
  task: string,
  status: string,
  dueDate?: string
) {
  const existingTeam = await getTeamById(teamId);
  if (existingTeam) {
    const newTodo = await createTodo({ userId, teamId, task, status, dueDate });
    return {
      status: 201,
      success: true,
      message: "Todo created successfully",
      payload: { newTodo },
    };
  }
  return {
    status: 400,
    success: false,
    message: "Invalid teamId",
  };
}

export async function getTodosService(userId: string, teamId: string) {
  const existingTeam = await getTeamById(teamId);
  if (existingTeam && (await memberIsInTeamService(teamId, userId))) {
    const todos = await getTodosByUserIdAndTeamId(userId, teamId);
    return {
      status: 200,
      success: true,
      message: "Todos fetched successfully",
      payload: { todos },
    };
  }
  return {
    status: 400,
    success: false,
    message: "invalid team Id",
  };
}
export async function getTodosByStatusService(
  userId: string,
  teamId: string,
  status: string
) {
  const existingTeam = await getTeamById(teamId);
  if (existingTeam && (await memberIsInTeamService(teamId, userId))) {
    const todos = await getTodosByStatus(userId, teamId, status);
    return {
      status: 200,
      success: true,
      message: "Todos fetched successfully",
      payload: { todos },
    };
  }
  return {
    status: 400,
    success: false,
    message: "invalid team Id",
  };
}

// ✅ Get Todo by ID
export async function getTodoByIdService(userId: string, todoId: string) {
  const todo = await getTodoById(todoId);

  if (!todo || todo.userId.toString() !== userId) {
    return {
      status: 400,
      success: false,
      message: "Invalid todo Id",
    };
  }

  return {
    status: 200,
    success: true,
    message: "Todo fetched successfully",
    payload: { todo },
  };
}

// ✅ Update Todo
export async function updateTodoService(
  userId: string,
  todoId: string,
  task: string,
  status: string,
  dueDate?: string
) {
  const todo = await getTodoById(todoId);

  if (!todo || todo.userId.toString() !== userId) {
    return {
      status: 403,
      success: false,
      message: "Cannot update this todo",
    };
  }

  const updatedTodo = await updateTodo(todoId, { task, status, dueDate });
  return {
    status: 200,
    success: true,
    message: "Todo updated successfully",
    payload: { updatedTodo },
  };
}

// ✅ Delete Todo
export async function deleteTodoService(userId: string, todoId: string) {
  const todo = await getTodoById(todoId);

  if (!todo || todo.userId.toString() !== userId) {
    return {
      status: 403,
      success: false,
      message: "Cannot delete this todo",
    };
  }

  await deleteTodo(todoId);
  return {
    status: 200,
    success: true,
    message: "Todo deleted successfully",
  };
}

export async function getTeamTodosService(userId: string, teamId: string) {
  const existingTeam = await getTeamById(teamId);
  if (existingTeam && (await memberIsInTeamService(teamId, userId))) {
    const todos = await getTodosByTeamId(teamId);
    return {
      status: 200,
      success: true,
      message: "Todos fetched successfully",
      payload: { todos },
    };
  }
  return {
    status: 400,
    success: false,
    message: "invalid team Id",
  };
}
