import TodoItem from "@/components/TodoItem/TodoItem";
import React, { useState } from "react";
import {
  Button,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const TodoScreen = () => {
  const todoTypes = ["personal", "task", "learn", "work", "home"] as const;

  const getRandomType = () => {
    return todoTypes[Math.floor(Math.random() * todoTypes.length)];
  };

  const generateDummyTodos = (count: number): ITodo[] => {
    return Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      title: `Sample Todo ${index + 1}`,
      completed: Math.random() < 0.3, // 30% chance to be completed
      type: getRandomType(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
  };

  const [todos, setTodos] = useState<ITodo[]>(generateDummyTodos(100));

  const [selectedId, setSelectedId] = useState<number>(0);

  const sectionTodos = todos.reduce((acc, todo) => {
    const section = acc.find((s) => s.title === todo.type);
    if (section) {
      section.data.push(todo);
    } else {
      acc.push({ title: todo.type ?? "", data: [todo] });
    }
    return acc;
  }, [] as { title: string; data: ITodo[] }[]);

  const handleEdit = (id: number, title: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, title, updatedAt: new Date().toISOString() }
          : todo
      )
    );
  };

  const handleToggle = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              updatedAt: new Date().toISOString(),
            }
          : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const renderInput = () => {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <TextInput></TextInput>
        <Button title={"Add"} />
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View>
          <Text style={styles.header}>TODAY</Text>
        </View>

        <SectionList
          style={{ flex: 1 }}
          sections={sectionTodos}
          renderItem={({ item }) => {
            return (
              <TodoItem
                todo={item}
                selectedId={selectedId}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onLongPress={(id) => {
                  setSelectedId(id);
                }}
              />
            );
          }}
          keyExtractor={(item) => item.id.toString()}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
        />
        {/* Footer input */}
        <View style={styles.footerContainer}>
          <TextInput
            style={styles.input}
            placeholder="New todo title"
            // value={newTodoTitle}
            // onChangeText={setNewTodoTitle}
          />
          <Button title="Add" />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    fontSize: 26,
    marginLeft: 8,
    marginBottom: 8,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  footer: {},
  item: {},
  sectionHeader: {
    fontSize: 12,
    fontWeight: "semibold",
    color: "#D1A28B",
    textTransform: "uppercase",
    marginVertical: 8,
    paddingHorizontal: 12,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 10,
  },
});
