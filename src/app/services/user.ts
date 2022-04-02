export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  phone: string;
  dateOfBirth: Date;
  email: string;
  password: string;
  city: string;
  state: string;
  roles: string[];
  imageUrl: string;
}
