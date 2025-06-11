import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Checkbox from "../CheckBox";

type TodoItemProps = {
  todo: ITodo;
  selectedId?: number;
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string) => void;
  onLongPress: (id: number) => void;
};

type modeType = "view" | "edit";

/**
 * Props for the `TodoItem` component.
 * - `todo`: The todo item.
 * - `onUpdateStatus`: Called when completion status changes.
 * - `onDelete`: Called to delete the todo.
 * - `onEdit`: Called to edit the todo title.
 * - `onLongPress`: Called on long press.
 * - `onPress`: Called on press.
 */
const TodoItem = ({
  todo,
  selectedId,
  onToggle,
  onDelete,
  onEdit,
  onLongPress,
}: TodoItemProps) => {
  const [completed, setCompleted] = useState(todo.completed);
  const [title, setTitle] = useState(todo.title);
  const [mode, setMode] = useState<modeType>("view");
  const inputRef = useRef<TextInput>(null);

  const handleEndEditing = () => {
    setMode("view");
    onEdit(todo.id, title);
  };

  const handleLongPress = () => {
    if (completed) {
      alert("Task is completed");

      return;
    }
    onLongPress(todo.id);
    setMode("edit");
    inputRef.current?.focus();
  };

  const handleSubmitEditing = () => {
    setMode("view");
    onEdit(todo.id, title);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  useEffect(() => {
    if (mode === "edit" && selectedId !== todo.id) {
      setMode("view");
    }
  }, [selectedId]);

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.container,
          mode === "edit" ? styles.textInputFocused : {},
        ]}
        onLongPress={handleLongPress}
        activeOpacity={0.7}
      >
        <View style={styles.checkboxContainer}>
          <Checkbox checked={completed} onToggle={setCompleted} />
        </View>

        <View style={styles.titleWrapper}>
          {mode === "view" ? (
            <Text
              style={[
                styles.titleContainer,
                {
                  textDecorationLine: completed ? "line-through" : "none",
                },
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {todo.title}
            </Text>
          ) : (
            <TextInput
              ref={inputRef}
              style={styles.textInput}
              value={title}
              onChange={(e) => setTitle(e.nativeEvent.text)}
              onBlur={handleEndEditing}
              onSubmitEditing={handleSubmitEditing}
              numberOfLines={1}
              multiline={false}
              returnKeyType="done"
            />
          )}
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity onPress={handleDelete}>
            <Ionicons name="close-outline" color="red" size={18} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    backgroundColor: "#F3EFEE",
    borderRadius: 5,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  titleWrapper: {
    flex: 1, // Takes remaining space
  },
  titleContainer: {
    fontSize: 17,
    fontWeight: "medium",
    color: "#333",
    flexShrink: 1,
  },
  checkboxContainer: {
    marginRight: 10,
  },
  textInput: {
    fontSize: 16,
    color: "#333",
    padding: 0,
    margin: 0,
    borderRadius: 4,
    flexShrink: 1,
    paddingRight: 15,
  },
  textInputFocused: {
    backgroundColor: "#f0f8ff",
    transitionDuration: "150ms",
  },
});
