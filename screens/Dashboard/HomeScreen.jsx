import { View, Image, ScrollView, StyleSheet } from "react-native";
import HomeHeader from "../../components/HomeScreen/HomeHeader";
import AccountInfo from "../../components/HomeScreen/AccountInfo";
import ServicesSection from "../../components/HomeScreen/ServicesSection";
import PromoCarousel from "../../components/HomeScreen/PromoCarousel";

import { services } from "../../data/services";

import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const handleServicePress = (item) => {
    if (item.screen) {
      navigation.navigate(
        item.screen,
        item.type ? { type: item.type } : undefined
      );
    }
  };

  return (
    <>
      <HomeHeader />
      <ScrollView style={styles.container}>
        <AccountInfo />

        {/* Add more dashboard content below */}
        <View style={styles.sections}>
          <ServicesSection
            title="Transfers"
            data={services.Transfer}
            onPress={handleServicePress}
          />
          <PromoCarousel />
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
          <PromoCarousel />
          <ServicesSection
            title="Rewards"
            data={services.Rewards}
            onPress={handleServicePress}
          />
        </View>
        <Image
          style={styles.promoImage}
          source={require("../../assets/promo/promo4.jpg")}
        />
      </ScrollView>
    </>
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
  promoImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
});
