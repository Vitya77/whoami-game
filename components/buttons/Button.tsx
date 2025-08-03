import { TouchableOpacity } from "react-native";

type ButtonProps = {
    onPress?: () => void;
    disabled?: boolean;
    children?: React.ReactNode;
}

export default function Button({ onPress, children, disabled }: ButtonProps) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      className="bg-blue-600 px-6 py-3 rounded-full"
    >
      {children}
    </TouchableOpacity>
  );
}