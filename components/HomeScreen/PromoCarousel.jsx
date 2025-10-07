import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import colors from "../../styles/colors";
import { promoData } from "../../data/promos";

const { width } = Dimensions.get("window");

const PromoCarousel = () => {
  const [ads, setAds] = useState([]);
  const [listReady, setListReady] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const currentIndex = useRef(0);
  const intervalRef = useRef(null);

  // Shuffle once when mounted
  useEffect(() => {
    const shuffled = [...promoData].sort(() => Math.random() - 0.5);
    setAds(shuffled);
  }, []);

  // Auto slide logic (runs only after FlatList is ready)
  useEffect(() => {
    if (!listReady || ads.length === 0) return;

    startAutoSlide();

    return () => stopAutoSlide();
  }, [listReady, ads]);

  // Helper: start and stop functions
  const startAutoSlide = () => {
    stopAutoSlide(); // clear any existing interval
    intervalRef.current = setInterval(() => {
      if (flatListRef.current && ads.length > 0) {
        currentIndex.current = (currentIndex.current + 1) % ads.length;
        flatListRef.current.scrollToIndex({
          index: currentIndex.current,
          animated: true,
        });
      }
    }, 3000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Detect manual swipe to pause/resume auto slide
  const handleScrollBegin = () => stopAutoSlide();
  const handleScrollEnd = () => startAutoSlide();

  const renderItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: item.bgColor }]}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.description}</Text>
      </View>
      <Image source={item.image} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={ads}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onLayout={() => setListReady(true)}
        onScrollBeginDrag={handleScrollBegin}
        onMomentumScrollEnd={handleScrollEnd}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onScrollToIndexFailed={(error) => {
          console.warn("Scroll error:", error);
        }}
      />

      {/* Pagination dots */}
      <View style={styles.dotsContainer}>
        {ads.map((_, i) => {
          const opacity = scrollX.interpolate({
            inputRange: [
              (i - 1) * width,
              i * width,
              (i + 1) * width,
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={i.toString()}
              style={[styles.dot, { opacity }]}
            />
          );
        })}
      </View>
    </View>
  );
};

export default PromoCarousel;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  card: {
    width: width - 40,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 4,
  },
  desc: {
    fontSize: 13,
    color: "#444",
    flexWrap: "wrap",
    maxWidth: "85%",
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginHorizontal: 4,
  },
});
