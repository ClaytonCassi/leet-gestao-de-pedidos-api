declare namespace Express {
  export interface User {
    id: string;
    name: string;
  }

  export interface Request {
    user: User;
  }
}