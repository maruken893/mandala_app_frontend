export interface User {
  id: number;
}

export interface Post {
  id: number;
  content: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}
