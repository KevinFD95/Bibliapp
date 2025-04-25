import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { WebView } from "react-native-webview";
import { epubToHtml } from "../services/epubService.js";
import { getEpub } from "../api/documents.js";

import { IconButton } from "../components/Button.jsx";
import { Popup } from "../components/opup.jsx";
import CloseIcon from "../../assets/icons/CloseIcon.jsx";

import colors from "../config/lightTheme.js";

const { width } = Dimensions.get("window");

export default function BookView({ navigation, route }) {
  const { document } = route.params;
  const [htmlContent, setHtmlContent] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    const fetchBookContent = async () => {
      try {
        const response = await getEpub(document.document_id);
        const { ok, status, data } = response;

        if (ok || status === 200) {
          const chaptersHtml = data.chapters.map((chapter) => {
            return epubToHtml({
              title: chapter.title,
              styles: chapter.styles,
              body: chapter.body,
            });
          });

          setHtmlContent(chaptersHtml);
        }
      } catch {
        setAlertMessage("No se ha podido abrir el libro");
        setAlertVisible(true);
      }
    };

    fetchBookContent();
  }, [document.document_id]);

  const renderChapter = ({ item }) => (
    <View style={{ width, flex: 1 }}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: item }}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}
      />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: colors["app-background"],
          flex: 1,
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
          <ActivityIndicator size={"large"} />
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
