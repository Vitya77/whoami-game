import Button from "@/components/buttons/Button";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-around px-4">
      <Text className="text-6xl font-bold text-blue-600 mb-12">
        Хто я?
      </Text>

      <Button onPress={() => {
        router.push("/rooms");
      }}>
        <Text className="text-white text-xl font-semibold">
          Почати гру
        </Text>
      </Button>
    </View>
  );
}
