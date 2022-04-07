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
  imageUrl?: string;
}

