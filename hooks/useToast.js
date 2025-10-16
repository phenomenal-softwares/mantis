import Toast from "react-native-toast-message";

export const showToast = (type, title, message) => {
  Toast.show({
    type,
    text1: title,
    text2: message,
    visibilityTime: 3000,
    autoHide: true,
    position: "top",
    topOffset: 50,
  });
};
