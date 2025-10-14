import "react-native-gesture-handler";
import "react-native-reanimated";
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardNavigator from "./screens/Dashboard/DashboardNavigator";

import { useFonts } from "expo-font";

// contexts
import { BalanceProvider } from "./contexts/BalanceContext";
import { TransactionHistoryProvider } from "./contexts/TransactionHistoryContext";
import { NotificationProvider } from "./contexts/NotificationContext";

// all screens
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/SubScreens/ProfileScreen";
import SupportScreen from "./screens/SubScreens/SupportScreen";
import NotificationsScreen from "./screens/SubScreens/NotificationsScreen";

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
      <BalanceProvider>
        <TransactionHistoryProvider>
          <NotificationProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Dashboard" component={DashboardNavigator} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Support" component={SupportScreen} />
            <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
        </NotificationProvider>
        </TransactionHistoryProvider>
      </BalanceProvider>
    </SafeAreaProvider>
  );
}
