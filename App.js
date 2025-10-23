import "react-native-gesture-handler";
import "react-native-reanimated";
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardNavigator from "./screens/Dashboard/DashboardNavigator";

// font
import { useFonts } from "expo-font";

// toast
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

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

// Responsive Wrapper for tablet-like views
import ResponsiveWrapper from "./components/UI/ResponsiveWrapper";

const Stack = createNativeStackNavigator();

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#028174", backgroundColor: "#E6F9F6" }}
      text1Style={{ fontSize: 16, fontWeight: "700", color: "#028174" }}
      text2Style={{ color: "#0a6b8b" }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "#d9534f" }}
      text1Style={{ fontSize: 16, fontWeight: "700" }}
    />
  ),
};

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
                          <ResponsiveWrapper>
            <NavigationContainer>
                <Stack.Navigator
                  initialRouteName="Login"
                  screenOptions={{ headerShown: false }}
                >
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen
                    name="Dashboard"
                    component={DashboardNavigator}
                  />
                  <Stack.Screen name="Profile" component={ProfileScreen} />
                  <Stack.Screen name="Support" component={SupportScreen} />
                  <Stack.Screen
                    name="Notifications"
                    component={NotificationsScreen}
                  />
                </Stack.Navigator>
                <Toast config={toastConfig} />
            </NavigationContainer>
                          </ResponsiveWrapper>
          </NotificationProvider>
        </TransactionHistoryProvider>
      </BalanceProvider>
    </SafeAreaProvider>
  );
}
