import React, { useContext } from "react";
import { useState } from "react";
import { TextInput, StyleSheet, View, Pressable, Text } from "react-native";
import { ThemeContext } from "../context/ThemeContext.jsx";
import { useAlert } from "../context/AlertContext.jsx";

import color from "../config/lightTheme.js";

import SearchIcon from "../../assets/icons/SearchIcon.jsx";
import FilterIcon from "../../assets/icons/FilterIcon.jsx";
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
  const { showAlert } = useAlert();
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const dropdownOptions = ["Título", "Autor", "Categoría", "Año", "Tipo"];

  return (
    <View style={currentStyles.containerWithDropdown}>
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
        <Pressable onPress={toggleDropdown}>
          <FilterIcon
            size={32}
            filled={showDropdown}
            selectedColor={color["selected-icons"]}
            unselectedColor={color["unselected-icons"]}
          />
        </Pressable>
      </View>

      {showDropdown && (
        <View style={currentStyles.dropdownContainer}>
          {dropdownOptions.map((option, index) => (
            <Pressable
              key={index}
              style={currentStyles.dropdownOption}
              onPress={() => {
                showAlert({ title: "Filtrar por...", message: option });
              }}
            >
              <Text style={currentStyles.h5}>{option}</Text>
            </Pressable>
          ))}
        </View>
      )}
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
      marginBottom: 20,
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

    dropdownContainer: {
      position: "absolute",
      top: 45 + 10,
      left: 250,
      width: "30%",
      right: 0,
      backgroundColor: theme["unselected-icons"],
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "white",
      elevation: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      zIndex: 1,
      overflow: "hidden",
    },
    dropdownOption: {
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: "white",
    },
    dropdownOptionText: {
      fontSize: 16,
      color: theme["text"],
    },
  });
