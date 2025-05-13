// React
import { useContext, useEffect, useState, useCallback } from "react";
import { ScrollView, StyleSheet, View, Text, Pressable } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

// Context
import { ThemeContext } from "../context/ThemeContext.jsx";

// Estilos
import { viewStyles } from "../styles/globalStyles.js";

// API
import { getAllRegisters } from "../api/registers.js";

// Componentes
import BookLite from "../components/CardComponent.jsx";
import { Popup } from "../components/PopupComponent.jsx";
import LoadingStyleSpinner from "../components/LoadingComponent.jsx";
import RefreshableView from "../components/RefreshableViewComponent.jsx";

// Iconos
import SearchIcon from "../../assets/icons/SearchIcon.jsx";
import DropdownIcon from "../../assets/icons/DropdownIcon.jsx";
import OrderIcon from "../../assets/icons/OrderIcon.jsx";

export default function Library() {
  const { theme } = useContext(ThemeContext);

  const themeStyles = viewStyles(theme);
  const libraryStyles = styles(theme);

  const navigation = useNavigation();

  const [alert, setAlert] = useState(false);
  const [error, setError] = useState();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [dropDown, setDropDown] = useState(false);
  const [sortOption, setSortOption] = useState("Título");
  const [desc, setDesc] = useState(false);

  const dropdownOptions = ["Título", "Autor", "Categoría", "Año", "Tipo"];

  const onRefresh = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await loadDocuments(setDocuments, setError, setLoading);
  };

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({ title: "Mi biblioteca" });
    }, [navigation]),
  );

  const sortedDocuments = [...documents].sort((a, b) => {
    switch (sortOption) {
      case "Título":
        if (desc) {
          return b.title.localeCompare(a.title);
        } else {
          return a.title.localeCompare(b.title);
        }
      case "Autor":
        if (desc) {
          return b.author.localeCompare(a.author);
        } else {
          return a.author.localeCompare(b.author);
        }
      case "Año":
        if (desc) {
          return (b.publication_year || 0) - (a.publication_year || 0);
        } else {
          return (a.publication_year || 0) - (b.publication_year || 0);
        }
      case "Tipo":
        if (desc) {
          return b.document_type.localeCompare(a.document_type);
        } else {
          return a.document_type.localeCompare(b.document_type);
        }
      case "Categoría":
        if (desc) {
          return b.category_1.localeCompare(a.category_1);
        } else {
          return a.category_1.localeCompare(b.category_1);
        }
      default:
        return 0;
    }
  });

  useEffect(() => {
    loadDocuments(setDocuments, setLoading, setError);
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme["app-background"],
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoadingStyleSpinner />
      </View>
    );
  }

  if (documents.length === 0) {
    return (
      <View style={[themeStyles.mainContainer]}>
        <RefreshableView onRefresh={onRefresh}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text
              style={[
                themeStyles.h3,
                { marginBottom: 30, textAlign: "center" },
              ]}
            >
              No tienes libros en tu biblioteca.
            </Text>
            <View style={{ alignItems: "center", gap: 8 }}>
              <Text style={[themeStyles.p, { textAlign: "center" }]}>
                Descubre los libros disponibles en la tienda en la sección de
                Búsqueda.
              </Text>
              <SearchIcon size={42} />
            </View>
          </View>
        </RefreshableView>
      </View>
    );
  }

  return (
    <View style={[themeStyles.mainContainer, { flex: 1 }]}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginBottom: 20,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Text style={themeStyles.h5}>Ordenar por: </Text>
          <Pressable
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
            }}
            onPress={() => (dropDown ? setDropDown(false) : setDropDown(true))}
          >
            <Text style={themeStyles.h5}>{sortOption}</Text>
            <DropdownIcon size={26} filled={dropDown} />
          </Pressable>
        </View>
        <Pressable
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
          }}
          onPress={() => setDesc(!desc)}
        >
          <Text style={themeStyles.h5}>
            {desc ? "Descendente" : "Ascendente"}
          </Text>
          <OrderIcon size={20} checked={desc} />
        </Pressable>
      </View>
      <RefreshableView onRefresh={onRefresh}>
        <ScrollView contentContainerStyle={libraryStyles.vistaTarjeta}>
          {sortedDocuments.map((item) => (
            <BookLite
              key={item.document_id}
              title={item.title}
              image={item.url_image}
              onPress={() => handleNavigation(navigation, item)}
            />
          ))}
        </ScrollView>
      </RefreshableView>

      {dropDown && (
        <View style={libraryStyles.dropdownContainer}>
          {dropdownOptions.map((option, index) => (
            <Pressable
              key={index}
              style={libraryStyles.dropdownOption}
              onPress={() => {
                setSortOption(option);
                setDropDown(false);
              }}
            >
              <Text style={themeStyles.h5}>{option}</Text>
            </Pressable>
          ))}
        </View>
      )}

      <Popup message={error} onClose={() => setAlert(false)} visible={alert} />
    </View>
  );
}

async function loadDocuments(setDocuments, setError, setLoading) {
  try {
    const response = await getAllRegisters();
    const { ok, status, data, errors } = response;

    if (ok && status === 200) {
      setDocuments(data.documents);
    } else {
      setError(errors);
    }
  } catch {
    setError("Error inesperado");
  } finally {
    setLoading(false);
  }
}

function handleNavigation(navigation, document) {
  navigation.navigate("BookDetails", { document });
}

const styles = (theme) =>
  StyleSheet.create({
    vistaTarjeta: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 30,
    },
    dropdownContainer: {
      position: "absolute",
      top: 50,
      width: "100%",
      marginHorizontal: 20,
      backgroundColor: theme["nav-background"],
      borderRadius: 5,
      borderWidth: 1,
      borderColor: theme["dark-text"],
      borderBottomWidth: 0,
      elevation: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      zIndex: 1,
      overflow: "hidden",
    },
    dropdownOption: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme["dark-text"],
      alignItems: "center",
    },
    dropdownOptionText: {
      fontSize: 16,
      color: theme["dark-text"],
    },
  });
