import DateSelector from "@/components/DateSelector/DateSelector";
import TodoItem from "@/components/TodoItem/TodoItem";
import React, { useEffect, useState } from "react";
import {
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const TodoScreen = () => {
  const todoTypes = ["personal", "task", "learn", "work", "home"] as const;

  const getRandomType = () => {
    return todoTypes[Math.floor(Math.random() * todoTypes.length)];
  };

  const generateDummyTodos = (count: number): ITodo[] => {
    return Array.from({ length: count }, (_, index) => {
      // Randomly generate a date within the last 10 days
      const daysAhead = Math.floor(Math.random() * 30);
      const createdAt = new Date(Date.now() + daysAhead * 24 * 60 * 60 * 1000);
      // Randomly generate an updatedAt after createdAt
      const updatedAt = new Date(
        createdAt.getTime() + Math.floor(Math.random() * (24 * 60 * 60 * 1000))
      );
      return {
        id: index + 1,
        title: `Sample Todo ${index + 1}`,
        completed: Math.random() < 0.3, // 30% chance to be completed
        type: getRandomType(),
        createdAt: createdAt.toISOString(),
        updatedAt: updatedAt.toISOString(),
      };
    });
  };

  const [todos, setTodos] = useState<ITodo[]>(generateDummyTodos(100));

  const [selectedId, setSelectedId] = useState<number>(0);
  const [sectionTodos, setSectionTodos] = useState<
    { title: string; data: ITodo[] }[]
  >([]);

  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const [inputValue, setInputValue] = useState<string>("");

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

  const handleAddTodo = (title: string) => {
    const todo: ITodo = {
      id: todos.length + 1,
      title,
      completed: false,
      type: getRandomType(),
      createdAt: new Date(selectedDate).toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTodos((prev) => [todo, ...prev]);
  };

  useEffect(() => {
    const inDateTodos = todos.filter((todo) => {
      return todo?.createdAt?.startsWith(selectedDate);
    });

    const inDateSectionTodos = convertToSectionTodos(inDateTodos);

    setSectionTodos(inDateSectionTodos);
  }, [todos, selectedDate]);

  const convertToSectionTodos = (todos: ITodo[]) => {
    return todos.reduce((acc, todo) => {
      const section = acc.find((s) => s.title === todo.type);
      if (section) {
        section.data.push(todo);
      } else {
        acc.push({ title: todo.type ?? "", data: [todo] });
      }
      return acc;
    }, [] as { title: string; data: ITodo[] }[]);
  };

  const handleChangeDate = (date: string) => {
    setSelectedDate(date);

    const inDateTodos = todos.filter((todo) => {
      return todo?.createdAt?.startsWith(date);
    });

    const inDateSectionTodos = convertToSectionTodos(inDateTodos);

    setSectionTodos(inDateSectionTodos);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View>
          <Text style={styles.header}>TODAY</Text>
          <DateSelector onDateSelected={handleChangeDate} />
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
            value={inputValue}
            onChangeText={setInputValue}
            onSubmitEditing={() => {
              handleAddTodo(inputValue);
              setInputValue("");
            }}
            returnKeyType="done"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            placeholder="New todo title"
          />
          <View
            style={{
              backgroundColor: "#393433",

              padding: 10,
              borderRadius: 8,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                handleAddTodo(inputValue);
                setInputValue("");
              }}
            >
              <Text
                style={{
                  color: "#F3EFEE",
                }}
              >
                Add
              </Text>
            </TouchableOpacity>
          </View>
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
    fontSize: 16,
    fontWeight: "bold",
    color: "#D1A28B",
    textTransform: "uppercase",
    marginVertical: 12,
    paddingHorizontal: 12,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    justifyContent: "space-between",
    paddingTop: 10,
    // flex: 1,
    gap: 10,
  },
  input: {
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#F3EFEE",
  },
});
