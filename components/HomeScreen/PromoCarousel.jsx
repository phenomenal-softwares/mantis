import { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, Image, StyleSheet, Animated, PanResponder } from "react-native";
import { promoData } from "../../data/promos";
import colors from "../../styles/colors";

export default function PromoCarousel() {
  // Randomize promo order once per mount
  const shuffledPromos = useMemo(
    () => [...promoData].sort(() => 0.5 - Math.random()),
    []
  );

  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideInterval = useRef(null);

  // Swipe gesture setup
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 20,
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 50) {
          handlePrev();
        } else if (gesture.dx < -50) {
          handleNext();
        }
      },
    })
  ).current;

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % shuffledPromos.length);
  };

  const handlePrev = () => {
    setIndex((prev) =>
      prev === 0 ? shuffledPromos.length - 1 : prev - 1
    );
  };

  // Auto-slide
  useEffect(() => {
    slideInterval.current = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(slideInterval.current);
  }, []);

  // Fade transition
  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [index]);

  const promo = shuffledPromos[index];

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Animated.View
        style={[
          styles.card,
          { backgroundColor: promo.bgColor, opacity: fadeAnim },
        ]}
      >
        <Image source={promo.image} style={styles.image} />
        <View style={styles.textWrap}>
          <Text style={styles.title}>{promo.title}</Text>
          <Text style={styles.description}>{promo.description}</Text>
        </View>
      </Animated.View>

      {/* Dots */}
      <View style={styles.dots}>
        {shuffledPromos.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 150,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
    marginVertical: 18,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    resizeMode: "cover",
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 3,
  },
  description: {
    fontSize: 14,
    color: "#444",
    lineHeight: 19,
  },
  dots: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.secondary,
  },
  activeDot: {
    backgroundColor: "#fff",
  },
});
