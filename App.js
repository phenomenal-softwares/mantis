import "react-native-gesture-handler";
import "react-native-reanimated";
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useFonts } from "expo-font";

import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/Dashboard/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    BrotonRegular: require("./assets/fonts/Broton-Regular.ttf"),
  });

  // ✅ Return early if fonts are not loaded
  if (!fontsLoaded) {
    return <LoadingScreen onFinish={() => setLoading(false)} />;
  }

  // ✅ Return early if app is in loading state
  if (loading) {
    return <LoadingScreen onFinish={() => setLoading(false)} />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Dashboard" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
