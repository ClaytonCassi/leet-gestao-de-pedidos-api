declare namespace Express {
  export interface User {
    id: string;
    name: string;
    role: string | null;
  }

  export interface Request {
    user: User;
  }
}