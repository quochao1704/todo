const useTodo = () => {
  const todos: Todo[] = [
    {
      id: 1,
      title: "Buy groceries",
      completed: false,
      createdAt: "2025-06-01T09:00:00Z",
      updatedAt: "2025-06-01T09:00:00Z",
    },
    {
      id: 2,
      title: "Walk the dog",
      completed: true,
      createdAt: "2025-06-02T08:30:00Z",
      updatedAt: "2025-06-02T10:00:00Z",
    },
    {
      id: 3,
      title: "Finish project report",
      completed: false,
      createdAt: "2025-06-03T12:45:00Z",
      updatedAt: "2025-06-03T12:45:00Z",
    },
    {
      id: 4,
      title: "Book dentist appointment",
      completed: false,
      createdAt: "2025-06-04T14:20:00Z",
      updatedAt: "2025-06-04T14:20:00Z",
    },
    {
      id: 5,
      title: "Reply to client emails",
      completed: true,
      createdAt: "2025-06-01T11:10:00Z",
      updatedAt: "2025-06-01T11:40:00Z",
    },
    {
      id: 6,
      title: "Prepare dinner",
      completed: false,
      createdAt: "2025-06-05T17:00:00Z",
      updatedAt: "2025-06-05T17:00:00Z",
    },
    {
      id: 7,
      title: "Clean the house",
      completed: true,
      createdAt: "2025-06-02T15:00:00Z",
      updatedAt: "2025-06-02T18:00:00Z",
    },
    {
      id: 8,
      title: "Read a book",
      completed: false,
      createdAt: "2025-06-06T20:00:00Z",
      updatedAt: "2025-06-06T20:00:00Z",
    },
    {
      id: 9,
      title: "Pay utility bills",
      completed: true,
      createdAt: "2025-06-03T09:30:00Z",
      updatedAt: "2025-06-03T10:00:00Z",
    },
    {
      id: 10,
      title: "Call mom",
      completed: false,
      createdAt: "2025-06-07T19:15:00Z",
      updatedAt: "2025-06-07T19:15:00Z",
    },
  ];

  return { todos };
};

export default useTodo;
