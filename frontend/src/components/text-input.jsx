import { useState } from "react";
import { TextInput, StyleSheet, View, Pressable } from "react-native";

import color from "../config/colors.json";

import SearchIcon from "../../assets/icons/search-icon.jsx";
import VisibilityIcon from "../../assets/icons/visibility-icon.jsx";

export function CustomTextBox({ value, onChangeText, placeholder }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      style={[styles.input, isFocused && styles.inputFocused]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
}

export function CustomTextBoxFind({ value, onChangeText, placeholder }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.inputFind, isFocused && styles.inputFindFocused]}>
      <SearchIcon
        size={32}
        filled={isFocused}
        selectedColor={color.icons["selected-icons"]}
        unselectedColor={color.icons["unselected-icons"]}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
}

export function CustomTextBoxPass({ value, onChangeText, placeholder }) {
  const [isFocused, setIsFocused] = useState(false);
  const [visibility, setVisibility] = useState(true);

  return (
    <View style={[styles.inputPass, isFocused && styles.inputPassFocused]}>
      <TextInput
        secureTextEntry={visibility}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{ flex: 1 }}
      />
      <Pressable onPress={() => setVisibility(!visibility)}>
        <VisibilityIcon size={24} checked={visibility} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 45,
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    color: color["black"],
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: color.icons["unselected-icons"],
  },

  inputFocused: {
    borderWidth: 3,
    borderColor: color["button-background"],
  },

  inputFind: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    width: "100%",
    height: 45,
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

  inputPass: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 45,
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    color: color["black"],
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: color.icons["unselected-icons"],
  },

  inputPassFocused: {
    borderWidth: 3,
    borderColor: color["button-background"],
  },
});
