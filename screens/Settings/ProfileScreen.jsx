import { View, Text } from "react-native";

export default function ProfileScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-xl font-bold text-primary">Profile Screen</Text>
      <Text className="text-gray-600 mt-2">User details will appear here</Text>
    </View>
  );
}
