import React, { useContext } from "react";
import { useState } from "react";
import { TextInput, StyleSheet, View, Pressable } from "react-native";
import { ThemeContext } from "../context/ThemeContext.jsx";

import color from "../config/LightTheme.js";

import SearchIcon from "../../assets/icons/SearchIcon.jsx";
import VisibilityIcon from "../../assets/icons/VisibilityIcon.jsx";

export function CustomTextBox({ value, onChangeText, placeholder }) {
  const { theme } = useContext(ThemeContext);
  const currentStyles = styles(theme);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      style={[currentStyles.input, isFocused && currentStyles.inputFocused]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
}

export function CustomTextBoxUser({ value, onChangeText, placeholder }) {
  const { theme } = useContext(ThemeContext);
  const currentStyles = styles(theme);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      style={[currentStyles.input, isFocused && currentStyles.inputFocused]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      autoCapitalize="none"
    />
  );
}

export function CustomTextBoxFind({ value, onChangeText, placeholder }) {
  const { theme } = useContext(ThemeContext);
  const currentStyles = styles(theme);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        currentStyles.inputFindView,
        isFocused && currentStyles.inputFindFocusedView,
      ]}
    >
      <SearchIcon
        size={32}
        filled={isFocused}
        selectedColor={color["selected-icons"]}
        unselectedColor={color["unselected-icons"]}
      />
      <TextInput
        style={currentStyles.textInput}
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
  const { theme } = useContext(ThemeContext);
  const currentStyles = styles(theme);
  const [isFocused, setIsFocused] = useState(false);
  const [visibility, setVisibility] = useState(true);

  return (
    <View
      style={[
        currentStyles.inputPassView,
        isFocused && currentStyles.inputPassFocusedView,
      ]}
    >
      <TextInput
        style={currentStyles.textInput}
        secureTextEntry={visibility}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <Pressable onPress={() => setVisibility(!visibility)}>
        <VisibilityIcon size={24} checked={visibility} />
      </Pressable>
    </View>
  );
}

const styles = (theme) =>
  StyleSheet.create({
    textInput: {
      flex: 1,
      height: "100%",
      padding: 0,
      color: theme["black"],
      fontSize: 16,
    },
    input: {
      width: "100%",
      height: 45,
      marginVertical: 20,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 10,
      color: theme["input-text"],
      borderWidth: 1,
      backgroundColor: theme["input-background"],
      borderColor: theme["unselected-icons"],
      fontSize: 16,
    },

    inputFocused: {
      borderWidth: 3,
      borderColor: color["button-background"],
    },

    inputFindView: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      width: "100%",
      height: 45,
      marginVertical: 20,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 20,
      borderWidth: 1,
      backgroundColor: "white",
      borderColor: theme["unselected-icons"],
    },

    inputFindFocusedView: {
      borderWidth: 3,
      borderColor: theme["button-background"],
    },

    inputPassView: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      height: 45,
      marginVertical: 20,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 10,
      borderWidth: 1,
      backgroundColor: "white",
      borderColor: theme["unselected-icons"],
    },

    inputPassFocusedView: {
      borderWidth: 3,
      borderColor: theme["button-background"],
    },
  });
