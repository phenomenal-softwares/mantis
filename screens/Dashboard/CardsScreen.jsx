import { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { user } from "../../data/user";
import { showToast } from "../../hooks/useToast";

export default function CardsScreen() {
  const { cards, account } = user;
  const scrollX = useRef(new Animated.Value(0)).current;
  const activeIndex = Animated.divide(scrollX, 340);
  const flatListRef = useRef(null);

  const handlePress = (action) => {
    showToast(
      "info",
      "Coming Soon",
      `${action} feature will be available soon.`
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>My Virtual Cards</Text>

      {/* Cards Carousel */}
      <Animated.FlatList
        ref={flatListRef}
        data={cards}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * 340,
            index * 340,
            (index + 1) * 340,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            extrapolate: "clamp",
          });

          const rotate = scrollX.interpolate({
            inputRange,
            outputRange: ["-10deg", "0deg", "10deg"],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              style={[
                styles.cardWrapper,
                { transform: [{ scale }, { rotateY: rotate }] },
              ]}
            >
              <LinearGradient colors={item.color} style={styles.card}>
                <View style={styles.cardTop}>
                  <Text style={styles.provider}>{account.bankName}</Text>
                </View>

              <View style={styles.cardMiddle}>
                <Text style={styles.number}>{item.number}</Text>
                <Image
                    source={require("../../assets/images/chip.webp")}
                    style={styles.chip}
                  />
              </View>
                
                <View style={styles.cardBottom}>
                  <View>
                    <Text style={styles.label}>CARD HOLDER</Text>
                    <Text style={styles.value}>{user.fullName.toUpperCase()}</Text>
                  </View>
                  <View>
                    <Text style={styles.label}>EXPIRES</Text>
                    <Text style={styles.value}>{item.expiry}</Text>
                  </View>
                </View>

                <Text style={styles.cardType}>{item.type}</Text>
              </LinearGradient>
            </Animated.View>
          );
        }}
      />

      {/* Pagination Dots */}
      <View style={styles.dotsContainer}>
        {cards.map((_, i) => {
          const opacity = scrollX.interpolate({
            inputRange: [(i - 1) * 340, i * 340, (i + 1) * 340],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });
          const scale = scrollX.interpolate({
            inputRange: [(i - 1) * 340, i * 340, (i + 1) * 340],
            outputRange: [0.8, 1.2, 0.8],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={i}
              style={[styles.dot, { opacity, transform: [{ scale }] }]}
            />
          );
        })}
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonRow}>
        {["Freeze Card", "View PIN", "Card Details", "New Card"].map((btn) => (
          <TouchableOpacity
            key={btn}
            style={styles.actionBtn}
            onPress={() => handlePress(btn)}
            activeOpacity={0.7}
          >
            <Text style={styles.btnText}>{btn}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dcecdbff",
    paddingVertical: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0a6b8b",
    marginLeft: 20,
    marginBottom: 15,
  },
  cardWrapper: { width: 340, alignItems: "center", justifyContent: "center" },

  card: {
    width: 320,
    height: 200,
    borderRadius: 20,
    padding: 20,
    justifyContent: "space-between",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  cardTop: { 
    flexDirection: "row", 
    justifyContent: "space-between" 
  },
  provider: { color: "#fff", fontWeight: "700", fontSize: 16 },
  cardMiddle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  number: {
    color: "#fff",
    fontSize: 22,
    letterSpacing: 2,
    marginTop: 20,
    marginBottom: 10,
  },
  chip: { 
    width: 50, 
    height: 40, 
    resizeMode: "contain" 
  },
  cardBottom: { flexDirection: "row", justifyContent: "space-between" },
  label: { color: "#fff", fontSize: 10 },
  value: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  cardType: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    position: "absolute",
    bottom: 40,
    right: 120,
    opacity: 0.6,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#0a6b8b",
    marginHorizontal: 6,
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  actionBtn: {
    backgroundColor: "#028174",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    margin: 6,
  },
  btnText: { color: "#fff", fontWeight: "600", fontSize: 14 },
});
