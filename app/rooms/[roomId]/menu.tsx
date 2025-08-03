import Button from "@/components/buttons/Button";
import usePlayers from "@/hooks/usePlayers";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function RoomMenu() {
  const { roomId } = useLocalSearchParams();
  const { players } = usePlayers(roomId ? Number(roomId) : 0);

  return (
    <View className="flex-1 items-center justify-around px-4">
      <View className="w-full items-center gap-y-10 px-4">
        <Text>Гравці</Text>
        <View className="w-full border border-gray-300 rounded-xl p-4 space-y-2 gap-y-5 bg-white">
          {players.length === 0 && (
            <Text className="text-center text-gray-500">Тут поки нема гравців</Text>
          )}
          {players.map((room) => (
            <Text
              key={room.id}
              className="text-lg bg-gray-100 rounded-md p-3 text-center"
            >
              {room.name}
            </Text>
          ))}
        </View>
      </View>

      <View className="w-full items-center gap-y-10 px-4">
        <Button onPress={() => {
          router.push(`/rooms/${roomId}/modal`);
        }}>
          <Text className="text-white text-xl font-semibold">
            Додати гравця
          </Text>
        </Button>

        <Button disabled={players.length === 0} onPress={() => {
          router.push(`/rooms/${roomId}/game/${players[0].id}/words-add`);
        }}>
          <Text className="text-white text-xl font-semibold">
            Почати гру
          </Text>
        </Button>
      </View>
    </View>
  );
} 