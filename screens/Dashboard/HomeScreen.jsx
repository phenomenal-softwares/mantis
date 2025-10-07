import { View, ScrollView, StyleSheet } from "react-native";
import HomeHeader from "../../components/HomeScreen/HomeHeader";
import AccountInfo from "../../components/HomeScreen/AccountInfo";
import ServicesSection from "../../components/HomeScreen/ServicesSection";

import { services } from "../../data/services";

import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const handleServicePress = (item) => {
    if (item.screen) navigation.navigate(item.screen);
  };

  return (
    <ScrollView style={styles.container}>
      <HomeHeader />
      <AccountInfo />

      {/* Add more dashboard content below */}
      <View style={styles.sections}>
        <ServicesSection
          title="Transfers"
          data={services.Transfer}
          onPress={handleServicePress}
        />
        <ServicesSection
          title="Bill Payments"
          data={services.BillPayments}
          onPress={handleServicePress}
        />
        <ServicesSection
          title="Wealth"
          data={services.Wealth}
          onPress={handleServicePress}
        />
        <ServicesSection
          title="Rewards"
          data={services.Rewards}
          onPress={handleServicePress}
        />
        <ServicesSection
          title="Other Services"
          data={services.Other}
          onPress={handleServicePress}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  sections: {
    paddingTop: 10,
    paddingBottom: 30,
  },
});
