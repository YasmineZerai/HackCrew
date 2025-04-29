export type Team = {
  _id: string;
  teamName: string;
};

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}
export interface Todo {
  _id: string;
  task: string;
  status: string;
  userId: string;
  teamId: string;
  dueDate?: string;
  description?: string;
}
export interface Ressource {
  _id: string;
  userId: string;
  teamId: string;
  path?: string;
  description?: string;
  link?: string;
}
