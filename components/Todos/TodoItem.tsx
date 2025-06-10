import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface TodoProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string) => void;
  onUpdateCompeted: (id: number, completed: boolean) => void;
}

const TodoItem = ({ todo, onDelete, onEdit, onUpdateCompeted }: TodoProps) => {
  const [mode, setModes] = useState<"view" | "edit">("view");
  const inputRef = React.useRef<TextInput>(null);
  const [title, setTitle] = useState(todo.title);
  const [completed, setCompleted] = useState(todo.completed);

  useEffect(() => {
    if (mode === "edit") {
      inputRef.current?.focus();
    }
  }, [mode]);

  const handleSwitch = () => {
    setCompleted((prev) => !prev);
    onUpdateCompeted(todo.id, !completed);
  };

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 20,
          backgroundColor: todo.completed ? "#d3ffd3" : "#fff",
          borderRadius: 5,
        }}
        onPress={() =>
          setModes((prev) => (prev === "view" && !completed ? "edit" : "view"))
        }
      >
        {mode === "view" ? (
          <View>
            <Text
              style={{
                fontSize: 16,
                textDecorationLine: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.title}
            </Text>
            <Text style={{ fontSize: 12, color: "#888" }}>
              {new Date(todo.createdAt || "").toLocaleDateString()}
            </Text>
            <Text style={{ fontSize: 12, color: "#888" }}>
              {new Date(todo.updatedAt || "").toLocaleDateString()}
            </Text>
          </View>
        ) : (
          <TextInput
            ref={inputRef}
            value={title}
            onChangeText={(e) => setTitle(e)}
            style={{
              fontSize: 16,
              flex: 1,
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 8,
              borderRadius: 5,
              marginRight: 20,
            }}
            onBlur={() => {
              onEdit(todo.id, title);
              setModes("view");
            }}
          ></TextInput>
        )}
        <Switch
          value={todo.completed}
          style={{
            transform: [{ scaleX: 0.75 }, { scaleY: 0.75 }],
          }}
          onValueChange={handleSwitch}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TodoItem;
