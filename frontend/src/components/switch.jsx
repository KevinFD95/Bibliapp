import React, { useState } from "react";
import { Switch, View, Text, StyleSheet } from "react-native";

const SwitchComponent = ({ label, onChange }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    if (onChange) onChange(!isEnabled);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Switch onValueChange={toggleSwitch} value={isEnabled} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    marginRight: 10,
    fontSize: 16,
  },
});

export default SwitchComponent;
