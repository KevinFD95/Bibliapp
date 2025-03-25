import { useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import color from "../config/colors.json";

export function CustomTextBox({ value, onChangeText, placeholder }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <TextInput
      style={[styles.input, isFocused && styles.inputFocused]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}

export function CustomTextBoxFind({ value, onChangeText, placeholder }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <TextInput
      style={[styles.inputFind, isFocused && styles.inputFindFocused]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    color: color["black"],
    fontSize: 16,
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: color.icons["unselected-icons"],
  },
  inputFocused: {
    borderWidth: 3,
    borderColor: color["button-background"],
  },

  inputFind: {
    width: "100%",
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    color: color["black"],
    fontSize: 16,
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: color.icons["unselected-icons"],
  },
  inputFindFocused: {
    borderWidth: 3,
    borderColor: color["button-background"],
  },
});
