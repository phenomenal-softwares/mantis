import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../styles/colors";

// main tab screens
import HomeScreen from "./HomeScreen";
import PaymentsScreen from "./PaymentsScreen";
import LoansScreen from "./LoansScreen";
import CardsScreen from "./CardsScreen";
import OtherScreen from "./OtherScreen";

// services screens
import TransferScreen from "../Services/TransferScreen";
import QRCodeScreen from "../Services/QRCodeScreen";
import AirtimeScreen from "../Services/AirtimeScreen";
import DataScreen from "../Services/DataScreen";
import BettingScreen from "../Services/BettingScreen";
import ElectricityScreen from "../Services/ElectricityScreen";
import CableTvScreen from "../Services/CableTvScreen";

// sub screens
import ProfileScreen from "../SubScreens/ProfileScreen";
import SupportScreen from "../SubScreens/SupportScreen";
import NotificationsScreen from "../SubScreens/NotificationsScreen";
import ComingSoonScreen from "../SubScreens/ComingSoonScreen";
import TransactionHistoryScreen from "../SubScreens/TransactionHistoryScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/**
 * DashboardTabs — holds the 5 main bottom-tab screens
 */
function DashboardTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: "#ccc",
        tabBarStyle: {
          backgroundColor: colors.primary,
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 6,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case "Home":
              iconName = "home-outline";
              break;
            case "Payments":
              iconName = "cash-outline";
              break;
            case "Loans":
              iconName = "wallet-outline";
              break;
            case "Cards":
              iconName = "card-outline";
              break;
            case "Other":
              iconName = "grid-outline";
              break;
            default:
              iconName = "ellipse-outline";
          }
          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Payments" component={PaymentsScreen} />
      <Tab.Screen name="Cards" component={CardsScreen} />
      <Tab.Screen name="Loans" component={LoansScreen} />
      <Tab.Screen name="Other" component={OtherScreen} />
    </Tab.Navigator>
  );
}

/**
 * DashboardNavigator — wraps the tabs with a stack
 * so sub-screens can be opened on top of the dashboard.
 */
export default function DashboardNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Bottom tabs (main dashboard) */}
      <Stack.Screen name="DashboardTabs" component={DashboardTabs} />

      {/* Services */}
      <Stack.Screen name="Transfer" component={TransferScreen} />
      <Stack.Screen name="QRCode" component={QRCodeScreen} />
      <Stack.Screen name="Airtime" component={AirtimeScreen} />
      <Stack.Screen name="Data" component={DataScreen} />
      <Stack.Screen name="Betting" component={BettingScreen} />
      <Stack.Screen name="Electricity" component={ElectricityScreen} />
      <Stack.Screen name="CableTV" component={CableTvScreen} />

      {/* Sub screens */}
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Support" component={SupportScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="ComingSoon" component={ComingSoonScreen} />
      <Stack.Screen
        name="TransactionHistory"
        component={TransactionHistoryScreen}
      />
    </Stack.Navigator>
  );
}
