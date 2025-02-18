export interface User {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    status?: 'active' | 'inactive';
    createdAt?: string;
  }