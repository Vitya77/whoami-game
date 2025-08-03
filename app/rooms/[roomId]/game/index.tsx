import Button from "@/components/buttons/Button";
import { Word } from "@/db/schema";
import useDeleteWord from "@/hooks/useDeleteWord";
import usePlayers from "@/hooks/usePlayers";
import useWords from "@/hooks/useWords";
import useWordsExceptPlayers from "@/hooks/useWordsExceptPlayers";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Game = () => {
  const {roomId} = useLocalSearchParams();
  const {words: allWords} = useWords(roomId ? Number(roomId) : 0);
  const {players} = usePlayers(roomId ? Number(roomId) : 0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState<Word>();
  const [isWordVisible, setIsWordVisible] = useState(false);

  const getWordsExceptPlayers = useWordsExceptPlayers(roomId ? Number(roomId) : 0);
  const deleteWord = useDeleteWord();

  const getRandomWord = useCallback(async (playerId: number) => {
    const words = await getWordsExceptPlayers(playerId);

    return words[Math.floor(Math.random() * words.length)];
  }, [getWordsExceptPlayers]);

  const setNextPlayer = useCallback(async () => {
    setIsWordVisible(false);
    if (currentWord) {
      deleteWord(currentWord.id);
      const randomWord = await getRandomWord(players[(currentPlayerIndex + 1) % players.length].id);
      setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
      setCurrentWord(randomWord);
    }
  }, [currentPlayerIndex, currentWord, deleteWord, getRandomWord, players]);

  const endGame = () => {
    router.replace('/');
  };

  useEffect(() => {
    (async () => {
      const randomWord = await getRandomWord(players[0].id);
      setCurrentWord(randomWord);
    })()
  }, [players]);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-around px-4">
        <View className="absolute top-0 right-10">
          <Text>Залишилось слів: {allWords.length}</Text>
        </View>

        <View className="gap-10">
          <Text className="text-xl bg-gray-100 rounded-md p-3 text-center">
            {allWords.length === 0 ? "Слів не залишилось!" : `Черга вгадувати гравця ${players[currentPlayerIndex]?.name}`}
          </Text>
          {allWords.length > 0 && (
            <>
              <Text className="text-lg bg-gray-100 rounded-md p-3 text-center">
                {isWordVisible ? `Слово: ${currentWord?.text}` : "Слово приховане"}
              </Text>
              <Button onPress={() => {
                setIsWordVisible(prev => !prev);
              }}>
                <Text className="text-white text-xl font-semibold">
                  {isWordVisible ? "Приховати слово" : "Показати слово"}
                </Text>
              </Button>
            </>
          )}

          <Button onPress={allWords.length > 0 ? setNextPlayer : endGame}>
            <Text className="text-white text-xl font-semibold">
              {allWords.length > 0 ? "Наступне слово" : "Завершити гру"}
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Game;