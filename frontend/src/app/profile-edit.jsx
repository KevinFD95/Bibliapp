import { ScrollView, Text, StyleSheet, View, Image, TextInput } from "react-native";
import viewStyle from "../styles/view-styles.jsx";
import SwitchButton from "./SwitchButton";
import { CustomTextBox } from "../components/text-input.jsx";
export default function HomeStackNavigator() {
  return (

    <ScrollView contentContainerStyle={viewStyle.mainContainer}>

        <View style={{alignItems: "center"}}>
                <Image
                  source={{
                    uri: "https://media.istockphoto.com/id/1495088043/es/vector/icono-de-perfil-de-usuario-avatar-o-icono-de-persona-foto-de-perfil-símbolo-de-retrato.jpg?s=612x612&w=0&k=20&c=mY3gnj2lU7khgLhV6dQBNqomEGj3ayWH-xtpYuCXrzk=",
                  }}
                  style={styles.image} 
                />
                      <Text style={{marginTop:10,marginBottom:50}}>Icono Perfil</Text>
              </View>
        
      <View style={styles.text}>
        <Text>Nombre de Usuario: </Text>
        <Text>joan005</Text>
        <CustomTextBox></CustomTextBox>
      </View> 
      <View style={styles.text}>
        <Text>Correo Electronico: </Text>
        <Text>joancarmona05@gmail.com</Text>
        <CustomTextBox></CustomTextBox>
      </View>
      <View style={styles.text}>
        <Text>Apellido: </Text>
        <Text>Carmona</Text>
        <CustomTextBox></CustomTextBox>
      </View>
      <View style={styles.text}>
        <Text>Direccion: </Text>
        <Text>C/ MiCasa Nº1</Text>
        <CustomTextBox></CustomTextBox>
      </View>
      <View style={styles.text}>
        <Text>Nombre: </Text>
        <Text>joan</Text>
        <CustomTextBox></CustomTextBox>
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
