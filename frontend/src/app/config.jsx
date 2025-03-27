import { ScrollView, Text, StyleSheet, View, Image } from "react-native";
import viewStyle from "../styles/view-styles.jsx";
export default function HomeStackNavigator() {
  return (

    <ScrollView contentContainerStyle={viewStyle.mainContainer}>
      <View style={styles.box}>

    <View style={styles.box}>
    <Text>Tema</Text>
    <Image>
    source={{
            uri: ""
          }}
          style={{height:50,width:50}} 
    </Image>
    <Image>
    source={{
            uri: ""
          }}
          style={{height:50,width:50}} 
    </Image>
    </View>
      <Text>Notificaciones</Text>
      <Text>Recordatorio de lectura</Text>
      <Text>Recomendaciones de libros</Text>
      <Text>Modificar metodo de pago</Text>
      <Text>Suscripcion premium</Text>
      <Text>Historial de pagos</Text>



    



      </View>    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  box: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    height: 150,
    width: 150,
    alignItems: "center",
  },
  text: {
    marginBottom:20
  }
});
