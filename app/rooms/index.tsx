import Button from "@/components/buttons/Button";
import useRooms from "@/hooks/useRooms";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { rooms } = useRooms(); 

  return (
    <View className="flex-1 items-center justify-around px-4">
      <View className="w-full items-center gap-y-10 px-4">
        <Text>Кімнати</Text>
        <View className="w-full border border-gray-300 rounded-xl p-4 space-y-2 gap-y-5 bg-white">
          {rooms.length === 0 && (
            <Text className="text-center text-gray-500">Кімнат немає, створіть нову</Text>
          )}
          {rooms.map((room) => (
            <TouchableOpacity
              key={room.id}
              onPress={() => router.push(`/rooms/${room.id}/menu`)}
            >
              <Text
                className="text-lg bg-gray-100 rounded-md p-3 text-center"
              >
                {room.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <Button onPress={() => {
        router.push("/rooms/modal")
      }}>
        <Text className="text-white text-xl font-semibold">
          Створити кімнату
        </Text>
      </Button>
    </View>
  );
}