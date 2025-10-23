import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../styles/colors";

const skillCards = [
  {
    icon: "card-outline",
    title: "Fintech & Payments",
    subtitle: "Wallets, loans, and secure transaction systems.",
  },
  {
    icon: "globe-outline",
    title: "Web Platforms",
    subtitle: "Enterprise-grade dashboards and portals.",
  },
  {
    icon: "phone-portrait-outline",
    title: "Mobile Development",
    subtitle: "Cross-platform apps with modern UX.",
  },
  {
    icon: "cog-outline",
    title: "Automation",
    subtitle: "Workflow tools and backend integrations.",
  },
  {
    icon: "color-palette-outline",
    title: "UI/UX Design",
    subtitle: "Clean, accessible, and elegant interfaces.",
  },
];

export default function OthersScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header / Intro */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 600 }}
        style={styles.header}
      >
        <Text style={styles.brand}>Phenomenal Productions</Text>
        <Text style={styles.tagline}>Crafting Next-Gen Digital Solutions</Text>
        <Text style={styles.intro}>
          We build scalable fintech and web apps with sleek design,
          intuitive user experience, and robust engineering quality.
          Every screen you see here can easily be transformed into a
          real, production-ready platform.
        </Text>
      </MotiView>

      {/* Skill Cards */}
      <View style={styles.skillsGrid}>
        {skillCards.map((card, index) => (
          <MotiView
            key={index}
            from={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: index * 150 }}
            style={styles.skillCard}
          >
            <Ionicons name={card.icon} size={32} color={colors.light} />
            <Text style={styles.skillTitle}>{card.title}</Text>
            <Text style={styles.skillSubtitle}>{card.subtitle}</Text>
          </MotiView>
        ))}
      </View>

      {/* Disclaimer */}
      <View style={styles.disclaimerBox}>
        <Ionicons name="alert-circle-outline" size={28} color={colors.secondary} />
        <Text style={styles.disclaimerText}>
          This Mantis app is a <Text style={{ fontWeight: "bold" }}>demo project</Text>{" "}
          by Phenomenal Productions. All transactions and balances are simulated for
          demonstration purposes only. No real financial data or activities occur.
        </Text>
      </View>

      {/* Why Choose Us */}
      <View style={styles.whySection}>
        <Text style={styles.sectionTitle}>Why Choose Us</Text>
        <View style={styles.whyItems}>
          <Text style={styles.whyItem}>🚀 Fast & Reliable Delivery</Text>
          <Text style={styles.whyItem}>🔐 Security-Driven Development</Text>
          <Text style={styles.whyItem}>🎯 Tailored Business Solutions</Text>
          <Text style={styles.whyItem}>💡 Creative & Scalable Designs</Text>
        </View>
      </View>

      {/* CTA Banner */}
      <MotiView
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 800 }}
        style={styles.ctaBox}
      >
        <Text style={styles.ctaTitle}>Ready to Go Digital with Us?</Text>
        <Text style={styles.ctaText}>
          Visit our official website to explore how we can bring your next big idea to life.
        </Text>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => Linking.openURL("https://phenomenalproductions.com.ng")}
        >
          <Text style={styles.ctaButtonText}>Visit Website</Text>
        </TouchableOpacity>
      </MotiView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    padding: 16,
  },
  header: {
    marginTop: 30,
    marginBottom: 24,
    alignItems: "center",
  },
  brand: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.primary,
  },
  tagline: {
    fontSize: 16,
    color: colors.secondary,
    marginTop: 4,
  },
  intro: {
    color: colors.darkGray,
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
    lineHeight: 22,
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  skillCard: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 16,
    width: "47%",
    marginVertical: 8,
    elevation: 4,
  },
  skillTitle: {
    color: colors.light,
    fontWeight: "700",
    fontSize: 14,
    marginTop: 10,
  },
  skillSubtitle: {
    color: "#e1e1e1",
    fontSize: 12,
    marginTop: 4,
    lineHeight: 16,
  },
  disclaimerBox: {
    backgroundColor: colors.warning,
    borderRadius: 12,
    padding: 16,
    marginVertical: 20,
    flexDirection: "row",
    gap: 10,
  },
  disclaimerText: {
    flex: 1,
    color: colors.dark,
    fontSize: 13,
    lineHeight: 20,
  },
  whySection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.secondary,
    marginBottom: 10,
  },
  whyItems: {
    paddingLeft: 8,
  },
  whyItem: {
    color: colors.darkGray,
    fontSize: 14,
    lineHeight: 24,
  },
  ctaBox: {
    backgroundColor: colors.secondary,
    borderRadius: 20,
    padding: 24,
    marginBottom: 40,
    alignItems: "center",
  },
  ctaTitle: {
    color: colors.light,
    fontSize: 18,
    fontWeight: "700",
  },
  ctaText: {
    color: "#e8f7f8",
    fontSize: 13,
    marginVertical: 10,
    textAlign: "center",
  },
  ctaButton: {
    backgroundColor: colors.accent,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 8,
  },
  ctaButtonText: {
    color: colors.dark,
    fontWeight: "700",
  },
});
