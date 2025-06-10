import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  onPress?: () => void;
}

const MetricCard = ({
  title,
  value,
  description,
  onPress,
}: MetricCardProps) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.amount}>{value}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MetricCard;

const styles = StyleSheet.create({
  container: {
    width: "48%",
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    minHeight: 100,
    maxHeight: 100,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: "column",
  },
  titleContainer: {
    marginBottom: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  title: {
    fontWeight: "500",
    textTransform: "uppercase",
    fontSize: 28,
    color: "#333",
  },
  amount: {
    fontWeight: "500",
    textTransform: "uppercase",
    fontSize: 28,
  },
});
