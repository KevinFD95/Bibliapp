// React
import { useContext, useEffect, useState, useCallback } from "react";
import { ScrollView, View, Text, Pressable } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

// Context
import { ThemeContext } from "../context/ThemeContext.jsx";
import { useAlert } from "../context/AlertContext.jsx";

// Estilos
import { viewStyles } from "../styles/globalStyles.js";
import { styles } from "../styles/libraryStyles.js";

// API
import { getAllRegisters } from "../api/registers.js";

// Componentes
import BookLite from "../components/CardComponent.jsx";
import LoadingStyleSpinner from "../components/LoadingComponent.jsx";
import RefreshableView from "../components/RefreshableViewComponent.jsx";

// Iconos
import SearchIcon from "../../assets/icons/SearchIcon.jsx";
import DropdownIcon from "../../assets/icons/DropdownIcon.jsx";
import OrderIcon from "../../assets/icons/OrderIcon.jsx";

export default function Library() {
  const { theme } = useContext(ThemeContext);
  const { showAlert } = useAlert();

  const themeStyles = viewStyles(theme);
  const libraryStyles = styles(theme);

  const navigation = useNavigation();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [dropDown, setDropDown] = useState(false);
  const [sortOption, setSortOption] = useState("Título");
  const [desc, setDesc] = useState(false);

  const dropdownOptions = ["Título", "Autor", "Categoría", "Año", "Tipo"];

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({ title: "Mi biblioteca" });
    }, [navigation]),
  );

  useEffect(() => {
    loadDocuments(setDocuments, showAlert, setLoading);
  }, [showAlert]);

  if (loading) {
    return (
      <View style={styles(theme).loadingScreen}>
        <LoadingStyleSpinner />
      </View>
    );
  }

  if (documents.length === 0) {
    return (
      <View style={themeStyles.mainContainer}>
        <RefreshableView
          onRefresh={() => onRefresh(setDocuments, showAlert, setLoading)}
        >
          <View style={styles(theme).noDocsScreen}>
            <Text style={[themeStyles.h3, styles(theme).noDocsTitle]}>
              No tienes libros en tu biblioteca.
            </Text>
            <View style={styles(theme).noDocsTextContainer}>
              <Text style={[themeStyles.p, styles(theme).noDocsText]}>
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
      <View style={styles(theme).filterContainer}>
        <View style={styles(theme).filterOrder}>
          <Text style={themeStyles.h5}>Ordenar por: </Text>
          <Pressable
            style={styles(theme).filterPressable}
            onPress={() => (dropDown ? setDropDown(false) : setDropDown(true))}
          >
            <Text style={themeStyles.h5}>{sortOption}</Text>
            <DropdownIcon size={26} filled={dropDown} />
          </Pressable>
        </View>
        <Pressable
          style={styles(theme).filterPressable}
          onPress={() => setDesc(!desc)}
        >
          <Text style={themeStyles.h5}>
            {desc ? "Descendente" : "Ascendente"}
          </Text>
          <OrderIcon size={20} checked={desc} />
        </Pressable>
      </View>
      <RefreshableView onRefresh={onRefresh}>
        <ScrollView contentContainerStyle={libraryStyles.cardScreen}>
          {getSortedDocuments(documents, sortOption, desc).map((item) => (
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
    </View>
  );
}

async function onRefresh(setDocuments, showAlert, setLoading) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  await loadDocuments(setDocuments, showAlert, setLoading);
}

function handleNavigation(navigation, document) {
  navigation.navigate("BookDetails", { document });
}

async function loadDocuments(setDocuments, showAlert, setLoading) {
  try {
    const response = await getAllRegisters();
    const { ok, status, data, errors } = response;

    if (ok && status === 200) {
      setDocuments(data.documents);
    } else {
      showAlert({ title: "Error", message: errors });
    }
  } catch {
    showAlert({ title: "Error", message: "Error inesperado" });
  } finally {
    setLoading(false);
  }
}

function getSortedDocuments(documents, sortOption, desc) {
  return [...documents].sort((a, b) => {
    const compare = (valA, valB) =>
      desc ? valB.localeCompare(valA) : valA.localeCompare(valB);

    switch (sortOption) {
      case "Título":
        return compare(a.title, b.title);
      case "Autor":
        return compare(a.author, b.author);
      case "Categoría":
        return compare(a.category_1, b.category_1);
      case "Tipo":
        return compare(a.document_type, b.document_type);
      case "Año":
        return desc
          ? (b.publication_year || 0) - (a.publication_year || 0)
          : (a.publication_year || 0) - (b.publication_year || 0);
      default:
        return 0;
    }
  });
}
