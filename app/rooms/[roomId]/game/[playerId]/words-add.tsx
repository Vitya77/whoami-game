import Button from "@/components/buttons/Button";
import useAddWord from "@/hooks/useAddWord";
import usePlayer from "@/hooks/usePlayer";
import usePlayers from "@/hooks/usePlayers";
import usePlayerWords from "@/hooks/usePlayerWords";
import { yupResolver } from "@hookform/resolvers/yup";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Text, TextInput, View } from "react-native";
import * as yup from "yup";

const schema = yup.object().shape({
  text: yup.string().required("Це обов'язкове поле"),
});

type FormData = {
  text: string;
};

const WordsAddScreen = () => {
  const [isWordsVisible, setIsWordsVisible] = useState(false);
  const {roomId, playerId} = useLocalSearchParams();
  const {player} = usePlayer(roomId ? Number(roomId) : 0, playerId ? Number(playerId) : 0);
  const {players} = usePlayers(roomId ? Number(roomId) : 0);
  const {words} = usePlayerWords(roomId ? Number(roomId) : 0, playerId ? Number(playerId) : 0);
  const addWord = useAddWord(roomId ? Number(roomId) : 0, playerId ? Number(playerId) : 0);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    addWord(data.text).then(() => {
      reset();
    })
  };

  return isWordsVisible ?
    (
      <View className="flex-1 items-center justify-around px-4">
        <View className="w-full border border-gray-300 rounded-xl p-4 space-y-2 gap-y-5 bg-white">
          {words.length === 0 && (
            <Text className="text-center text-gray-500">Додайте хоча б одне слово</Text>
          )}
          {words.map((word) => (
            <Text
              key={word.id}
              className="text-lg bg-gray-100 rounded-md p-3 text-center"
            >
              {word.text}
            </Text>
          ))}
        </View>
        <KeyboardAvoidingView behavior='position' contentContainerClassName="gap-y-5" className="w-full p-4 gap-y-5">
          <View className="w-full px-4 space-y-4">
            <Controller
              control={control}
              name="text"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="Слово"
                  className="border border-gray-300 bg-white rounded-xl px-4 py-3 text-lg"
                  placeholderTextColor="#9CA3AF"
                />
              )}
            />
            {errors.text && (
              <Text className="text-red-500">{errors.text.message}</Text>
            )}
          </View>
          <Button onPress={handleSubmit(onSubmit)}>
            <Text className="text-white text-xl font-semibold">
              Додати слово
            </Text>
          </Button>
          <Button disabled={words.length === 0} onPress={() => {
            const nextPlayer = players.at(players.findIndex((p) => p.id === player?.id) + 1);

            if (nextPlayer) {
              router.push(`/rooms/${roomId}/game/${nextPlayer.id}/words-add/`);
            }
            else {
              router.push(`/rooms/${roomId}/game/`);
            }
          }}>
            <Text className="text-white text-xl font-semibold">
              Закінчити
            </Text>
          </Button>
        </KeyboardAvoidingView>
      </View>
    ) : (
      <View className="flex-1 items-center justify-around px-4">
        <Text>
            Передайте телефон гравцю {player?.name}
        </Text>
        <Button onPress={() => {
          setIsWordsVisible(true);
        }}>
          <Text className="text-white text-xl font-semibold">
          Так, це {player?.name}
          </Text>
        </Button>
      </View>
    );
}

export default WordsAddScreen;