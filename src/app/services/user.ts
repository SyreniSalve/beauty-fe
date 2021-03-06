import {Role} from "../models/role";

export interface User {
  id: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  phone?: string;
  dateOfBirth?: Date | string;
  email?: string;
  password?: string;
  city?: string;
  state?: string;
  roles?: Role[];
  events?: Event[];
  imageUrl?: string;
}

export interface ListOfUsersResponse {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  users: User[];
}

export interface ListOfOwnersResponse {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  owners: User[];
}

