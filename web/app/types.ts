export interface Video {
  id: string;
  url: string;
  liked: boolean;
  saved: boolean;
  current: boolean;
}

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
}

export interface AdminStats {
  totalUsers: number;
  totalTodos: number;
  completedTodos: number;
  pendingTodos: number;
}
