import React, { useState, useEffect, useContext } from "react";
import { FlatList, View, Text, Dimensions, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import { documentToHtml } from "../services/docViewService.js";
import { getDocument } from "../api/documents.js";

import { IconButton } from "../components/ButtonComponent.jsx";
import { Popup } from "../components/PopupComponent.jsx";
import CloseIcon from "../../assets/icons/CloseIcon.jsx";
import CustomLoader from "../components/LoadingComponent.jsx";

import { ThemeContext } from "../context/ThemeContext.jsx";

const { width } = Dimensions.get("window");

export default function BookView({ navigation, route }) {
  const { document } = route.params;

  const { theme } = useContext(ThemeContext);

  const [htmlContent, setHtmlContent] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    const fetchBookContent = async () => {
      try {
        const response = await getDocument(document.document_id);
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
        setAlertMessage("No se ha podido abrir el libro");
        setAlertVisible(true);
      }
    };

    fetchBookContent();
  }, [document.document_id, theme]);

  const renderChapter = ({ item }) => (
    <View style={{ width, flex: 1 }}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: item }}
        style={{ flex: 1, backgroundColor: theme["book-view-background"] }}
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}
        allFileAccess={true}
        allowingReadAccessToURL={"*"}
        mixedContentMode="always"
        allowUniversalAccessFromFileURLs={true}
      />
    </View>
  );

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
        {alertVisible && <Text>{alertMessage}</Text>}
        {htmlContent.length > 0 ? (
          <FlatList
            data={htmlContent}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderChapter}
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
        <Popup
          title={"Aviso"}
          message={alertMessage}
          visible={alertVisible}
          onClose={() => setAlertVisible(false)}
        />
      </View>
    </SafeAreaView>
  );
}
