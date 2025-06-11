import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";

interface DateSelectorProps {
  startDate?: Date;
  onDateSelected?: (date: string) => void;
}

const DateSelector = ({
  startDate = new Date(),
  onDateSelected,
}: DateSelectorProps) => {
  const [dates, setDates] = useState<DayItem[]>(getUpcomingDates(7, startDate));

  const [selected, setSelected] = useState<string>(dates[0].fullDate);

  const handleSelectDate = (dateText: string) => {
    onDateSelected?.(dateText);
    setSelected(dateText);
  };

  const renderItem = ({ item }: { item: DayItem }) => {
    const isSelected = selected === item.fullDate;
    return (
      <TouchableOpacity
        style={[styles.item, isSelected && styles.selectedItem]}
        onPress={() => handleSelectDate(item.fullDate)}
      >
        <Text style={[styles.day, isSelected && styles.selectedText]}>
          {item.day}
        </Text>
        <Text style={[styles.date, isSelected && styles.selectedText]}>
          {item.date}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleEndReached = () => {
    const latest = new Date(dates[dates.length - 1].fullDate);
    latest.setDate(latest.getDate() + 1); // Start from the next day
    console.log(latest);
    const newDates = getUpcomingDates(7, latest);
    console.log(newDates);
    setDates((prev) => [...prev, ...newDates]);
  };

  return (
    <FlatList
      horizontal
      data={dates}
      keyExtractor={(item, index) => item.fullDate + index.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      onEndReached={() => {
        handleEndReached();
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 12,
    // paddingVertical: 16,
  },
  item: {
    width: 60,
    height: 80,
    marginHorizontal: 6,
    borderRadius: 12,
    backgroundColor: "#f6f4f3",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedItem: {
    backgroundColor: "#e8dfd2",
  },
  day: {
    fontSize: 12,
    color: "#888",
    fontWeight: "500",
  },
  date: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  selectedText: {
    color: "#000",
  },
});

export default DateSelector;

export interface DayItem {
  day: string; // e.g. "WED"
  date: string; // e.g. "25"
  fullDate: string; // e.g. "2025-06-25"
}

export const getUpcomingDates = (
  count: number = 7,
  startDate: Date = new Date()
): DayItem[] => {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const result: DayItem[] = [];

  for (let i = 0; i < count; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    result.push({
      day: days[date.getDay()],
      date: date.getDate().toString(),
      fullDate: date.toISOString().split("T")[0],
    });
  }

  return result;
};
