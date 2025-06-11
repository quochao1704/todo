import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

export interface CheckboxProps {
  checked?: boolean;
  onToggle?: (checked: boolean) => void;
  size?: number;
  color?: string;
  uncheckedColor?: string;
  checkboxStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  disabled?: boolean;
  checkmarkColor?: string;
  testID?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onToggle,
  size = 24,
  color = "#007AFF",
  uncheckedColor = "#C7C7CC",
  checkboxStyle,
  containerStyle,
  disabled = false,
  checkmarkColor = "#FFFFFF",
  testID,
}) => {
  const handlePress = (): void => {
    if (!disabled && onToggle) {
      onToggle(!checked);
    }
  };

  const checkboxStyles: ViewStyle[] = [
    styles.checkbox,
    {
      width: size,
      height: size,
      backgroundColor: checked ? color : "transparent",
      borderColor: checked ? color : uncheckedColor,
      opacity: disabled ? 0.5 : 1,
    },
    checkboxStyle,
  ].filter(Boolean) as ViewStyle[];

  const renderCheckmark = (): React.ReactNode => {
    if (checked) {
      return (
        <View style={styles.checkmark}>
          <Text style={[styles.checkmarkText, { color: checkmarkColor }]}>
            ✓
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
      testID={testID}
    >
      <View style={checkboxStyles}>{renderCheckmark()}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  checkbox: {
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    justifyContent: "center",
    alignItems: "center",
  },
  checkmarkText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Checkbox;
