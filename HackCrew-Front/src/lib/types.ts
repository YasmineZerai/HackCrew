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
