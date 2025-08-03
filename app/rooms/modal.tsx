import Button from "@/components/buttons/Button";
import useAddRoom from "@/hooks/useAddRoom";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().min(3, "Назва має бути довшою").required("Це обов'язкове поле"),
});

type FormData = {
  name: string;
};

export default function RoomCreationForm() {
    const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<FormData>({
      resolver: yupResolver(schema),
    });

    const addRoom = useAddRoom();

    const onSubmit = (data: FormData) => {
      addRoom(data.name).then(() => {
        reset();
        router.back();
      })
    };

    return (
        <View className="flex-1 items-center justify-center gap-y-10 px-4">
          <View className="w-full px-4 space-y-4">
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="Нова кімната"
                  className="border border-gray-300 bg-white rounded-xl px-4 py-3 text-lg"
                  placeholderTextColor="#9CA3AF"
                />
              )}
            />
            {errors.name && (
              <Text className="text-red-500">{errors.name.message}</Text>
            )}
          </View>

            <Button onPress={handleSubmit(onSubmit)}>
              <Text className="text-white text-xl font-semibold">
                Створити кімнату
              </Text>
            </Button>
        </View>
    );
}