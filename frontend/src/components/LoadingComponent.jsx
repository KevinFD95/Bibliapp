import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

import SyncIcon from "../../assets/icons/SyncIcon.jsx";

const LoadingStyleSpinner = () => {
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
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <SyncIcon size={60} />
    </Animated.View>
  );
};

export default LoadingStyleSpinner;
