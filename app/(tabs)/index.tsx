import MetricCard from "@/components/Cards/MetricCard";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          padding: 12,
        }}
      >
        <MetricCard title="Today" value="22" description="Today" />
        <MetricCard title="Month" value="440" description="This month" />
        <MetricCard title="Year" value="7k" description="Year to date" />
      </View>
    </SafeAreaView>
  );
}
