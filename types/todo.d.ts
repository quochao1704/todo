interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface ITodo {
  id: number;
  title: string;
  completed: boolean;
  type?: string;
  createdAt?: string;
  updatedAt?: string;
}
