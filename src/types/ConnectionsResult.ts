import { DataUser, LoginUser, RegisterUser } from "./authTypes";
import { BookI } from "./booksTypes";

export interface ConnectionResult {
  success: boolean;
  message?: string;
}

export interface QueryResponse { 
  success: boolean,
  message: string,
  data?: BookI | BookI[] | RegisterUser | RegisterUser[] | LoginUser | LoginUser[] | DataUser | DataUser [] | string| null
  error?: string
}