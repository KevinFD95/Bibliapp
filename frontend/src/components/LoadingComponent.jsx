import { useEffect, useRef, useContext } from "react";
import { View, Animated, StyleSheet, Easing } from "react-native";

import { ThemeContext } from "../context/ThemeContext.jsx";
import { viewStyles } from "../styles/globalStyles.js";

import SyncIcon from "../../assets/icons/SyncIcon.jsx";

const LoadingStyleSpinner = () => {
  const { theme } = useContext(ThemeContext);
  const themeStyles = viewStyles(theme);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["360deg", "0deg"],
  });

  return (
    <View style={[styles.container, themeStyles.mainContainer]}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <SyncIcon size={60} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  spinner: {
    width: 35,
    height: 35,
    borderRadius: 50,
    borderWidth: 3,
    borderTopColor: "red",
    borderRightColor: "transparent",
    borderBottomColor: "red",
    borderLeftColor: "transparent",
  },
});

export default LoadingStyleSpinner;
