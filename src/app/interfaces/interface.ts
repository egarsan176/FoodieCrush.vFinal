/**
 * Aquí se declaran todas las interfaces usadas en la aplicación
 */

export interface AuthResponse {
  access_token: string;
}

export interface User {
  id: number;
  fullName: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface UserBACK {
  id: number;
  fullName: string;
  username: string;
  email: string;
  password: string;
  role: string;
  fecha: Date;
}

export interface ErrorResponse {
  status: number;
  message: string;
}

export interface Recipe {
  id: number;
  recipeName: string;
  method: string[];
  category: number;
  ingredientLine: IngredientLine[];
  file: FileDB;
  comments: string[];
  isPending: boolean;
}

export interface IngredientLine {
  ingredient: string;
  amount: number;
}

export interface FileDB {
  name: string;
  data: number;
  type: string;
}

export interface UserDetails {
  sub: string;
  role: string;
  iss: string;
  exp: number;
  iat: number;
  email: string;
  username: string;
}

export interface RecipeComment {
  message: string;
}

export interface ContactMsg {
  id: number;
  fecha: string;
  email: string;
  message: string;
  fullName: string;
}
