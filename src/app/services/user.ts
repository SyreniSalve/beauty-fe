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

export interface UserInformation {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  city: string;
  roles: string[];
  imageUrl: string;
}

// export interface Params {
//   keyword: string;
//   page: number;
//   size: number;
// }


// export interface PaginationInstance {
//   id?: number;
//   itemsPerPage: number;
//   currentPage: number;
//   totalItems?: number;
// }
