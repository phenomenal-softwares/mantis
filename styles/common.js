// styles/common.js
import { StyleSheet } from "react-native";
import colors from "./colors";

export const common = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 24,
  },
  input: {
    width: "100%",
    backgroundColor: colors.light,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: colors.dark,
  },
  button: {
    width: "100%",
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: colors.light,
    fontSize: 16,
    fontWeight: "600",
  },
});
