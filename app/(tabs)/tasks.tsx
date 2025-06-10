import DropDown from "@/components/DropDowns/DropDown";
import TodoItem from "@/components/Todos/TodoItem";
import useTodo from "@/hooks/useTodo";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Filter = "all" | "completed" | "incomplete" | "today" | "week" | "month";

export default function TaskScreen() {
  const { todos: fakeTodos } = useTodo();
  const [todos, setTodos] = useState<Todo[]>(fakeTodos);

  const [completeAll, setCompleteAll] = useState(false);

  const handleCompleteAll = () => {
    setCompleteAll((prev) => !prev);
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({ ...todo, completed: !completeAll }))
    );
  };

  const handleAdd = () => {
    const newTodo: Todo = {
      id: Date.now(),
      title: `New Todo ${todos.length + 1}`,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleDelete = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id: number, title: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title: title } : todo
      )
    );
  };

  const handleUpdateCompleted = (id: number, isCompleted: boolean) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: isCompleted } : todo
      )
    );
  };

  useEffect(() => {
    // Update completeAll state based on todos
    const allCompleted = todos.every((todo) => todo.completed);
    setCompleteAll(allCompleted);
  }, [todos]);

  const handleFilter = (filter: Filter) => {
    if (filter === "all") {
      setTodos(fakeTodos);
    } else if (filter === "completed") {
      setTodos(fakeTodos.filter((todo) => todo.completed));
    } else if (filter === "incomplete") {
      setTodos(fakeTodos.filter((todo) => !todo.completed));
    } else if (filter === "today") {
      const today = new Date().toISOString().split("T")[0];
      setTodos(fakeTodos.filter((todo) => todo.createdAt!.startsWith(today)));
    } else if (filter === "week") {
      const today = new Date();
      const startOfWeek = new Date(
        today.setDate(today.getDate() - today.getDay())
      );
      const endOfWeek = new Date(today.setDate(today.getDate() + 6));
      setTodos(
        fakeTodos.filter((todo) => {
          const todoDate = new Date(todo.createdAt!);
          return todoDate >= startOfWeek && todoDate <= endOfWeek;
        })
      );
    } else if (filter === "month") {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      setTodos(
        fakeTodos.filter((todo) => {
          const todoDate = new Date(todo.createdAt!);
          return todoDate >= startOfMonth && todoDate <= endOfMonth;
        })
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Switch value={completeAll} onValueChange={handleCompleteAll} />

        <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
          <Text style={styles.addButtonText}>＋</Text>
        </TouchableOpacity>
        <DropDown
          items={[
            { label: "All", id: "all" },
            { label: "Completed", id: "completed" },
            { label: "Incomplete", id: "incomplete" },
            { label: "Today", id: "today" },
            { label: "Week", id: "week" },
            { label: "Month", id: "month" },
          ]}
          onSelect={(item) => handleFilter(item.id as Filter)}
        />
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onUpdateCompeted={handleUpdateCompleted}
          />
        )}
        contentContainerStyle={{ paddingBottom: 50 }}
        onEndReached={() => {
          console.log("End reached");
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 5,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 20,
  },
  addButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
