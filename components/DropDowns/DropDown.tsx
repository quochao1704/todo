import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type DropDownItem = {
  id: string;
  label: string;
};

type DropDownProps<T extends DropDownItem> = {
  items: T[];
  onSelect?: (item: T) => void;
};

function DropDown<T extends DropDownItem>({
  items,
  onSelect,
}: DropDownProps<T>) {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<T | null>(null);

  const handleSelect = (item: T) => {
    setSelected(item);
    setVisible(false);
    if (onSelect) onSelect(item);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setVisible((v) => !v)}
        style={styles.iconContainer}
      >
        <Ionicons name="chevron-down" size={24} color="black" />
        <Text style={styles.selectedText}>
          {selected ? selected.label : "Select an item"}
        </Text>
      </TouchableOpacity>
      {visible && (
        <View style={styles.dropdown}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => handleSelect(item)}
              >
                <Text>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: 200 },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  selectedText: { marginLeft: 8 },
  dropdown: {
    position: "absolute",
    top: 45,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
    zIndex: 1,
  },
  item: { padding: 10 },
});

export default DropDown;
