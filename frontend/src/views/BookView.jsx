// React
import { useState, useEffect, useContext } from "react";
import { FlatList, View, Dimensions, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

// Context
import { ThemeContext } from "../context/ThemeContext.jsx";
import { useAlert } from "../context/AlertContext.jsx";

// API
import { getDocument } from "../api/documents.js";

// Services
import { documentToHtml } from "../services/docViewService.js";

// Componentes
import CustomLoader from "../components/LoadingComponent.jsx";

// Iconos
import { IconButton } from "../components/ButtonComponent.jsx";
import CloseIcon from "../../assets/icons/CloseIcon.jsx";

const { width } = Dimensions.get("window");

export default function BookView({ navigation, route }) {
  const { document } = route.params;

  const { theme } = useContext(ThemeContext);
  const { showAlert } = useAlert();

  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetchBookContent(document.document_id, theme, setHtmlContent, showAlert);
  }, [document.document_id, theme, showAlert]);

  return (
    <SafeAreaView style={{ flexGrow: 1 }}>
      <View
        style={{
          flexGrow: 1,
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 20,
            right: 10,
            zIndex: 1,
          }}
        >
          <IconButton
            icon={<CloseIcon size={32} />}
            onPress={() => navigation.goBack()}
          />
        </View>
        {htmlContent.length > 0 ? (
          <FlatList
            data={htmlContent}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => renderChapter(item, theme)}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme["book-view-background"],
            }}
          >
            <CustomLoader />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

async function fetchBookContent(document_id, theme, setHtmlContent, showAlert) {
  try {
    const response = await getDocument(document_id);
    const { ok, status, data } = response;

    if (ok || status === 200) {
      const pagesHtml = data.pages.map((page) => {
        return documentToHtml({
          body: page.body,
          styles: page.styles,
          theme: theme,
        });
      });

      setHtmlContent(pagesHtml);
    }
  } catch {
    showAlert({
      title: "Error",
      message: "No se ha podido abrir el libro",
    });
  }
}

function renderChapter(item, theme) {
  return (
    <View style={{ width, flex: 1 }}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: item }}
        style={{ flex: 1, backgroundColor: theme["book-view-background"] }}
        showsVerticalScrollIndicator={true}
        scrollEnabled={true}
        nestedScrollEnabled={false}
        allFileAccess={true}
        allowingReadAccessToURL={"*"}
        mixedContentMode="always"
        allowUniversalAccessFromFileURLs={true}
      />
    </View>
  );
}
