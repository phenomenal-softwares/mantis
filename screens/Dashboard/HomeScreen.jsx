import React, { useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import { BalanceContext } from "../../contexts/BalanceContext";

export default function HomeScreen() {
  const { balance } = useContext(BalanceContext);

  return (
    <ScrollView className="flex-1 bg-light p-4">
      <Text className="text-xl font-bold text-primary mb-4">Welcome to Mantis</Text>
      <View className="bg-white p-4 rounded-lg shadow">
        <Text className="text-gray-600">Account Balance</Text>
        <Text className="text-2xl font-bold text-secondary">₦{balance.toLocaleString()}</Text>
      </View>
    </ScrollView>
  );
}
