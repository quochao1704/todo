import MetricCard from "@/components/Cards/MetricCard";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const queryClient = new QueryClient();

export default function HomeScreen() {
  const url = "https://dummyjson.com/todos";
  const { data } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
  });

  console.log("Api data: ", data);
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
