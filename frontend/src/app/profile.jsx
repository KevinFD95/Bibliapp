import { ScrollView, Text, StyleSheet, View, Image } from "react-native";
import viewStyle from "../styles/view-styles.jsx";
export default function HomeStackNavigator() {
  return (
<<<<<<< Updated upstream
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titleStyle}>Buscar</Text>
=======
    <ScrollView contentContainerStyle={viewStyle.mainContainer}>
      <View style={styles.box}>
      <Image
          source={{
            uri: "https://e7.pngegg.com/pngimages/410/195/png-clipart-pencil-drawing-pencil-angle-pencil.png"
          }}
          style={{height:50,width:50}} 
        />
        <View style={{alignItems: "center"}}>
                <Image
                  source={{
                    uri: "https://media.istockphoto.com/id/1495088043/es/vector/icono-de-perfil-de-usuario-avatar-o-icono-de-persona-foto-de-perfil-símbolo-de-retrato.jpg?s=612x612&w=0&k=20&c=mY3gnj2lU7khgLhV6dQBNqomEGj3ayWH-xtpYuCXrzk=",
                  }}
                  style={styles.image} 
                />
                      <Text style={{marginTop:10,marginBottom:50}}>Icono Perfil</Text>
              </View>

        <Image
          source={{
            uri: "https://e7.pngegg.com/pngimages/529/757/png-clipart-computer-icons-nut-bolt-desktop-wallpaper-cog.png"
          }}
          style={{height:50,width:50}} 
        />
      </View>

      <View style={{marginBottom:20}}>
        <Text>Nombre de Usuario: </Text>
        <Text>joan005</Text>
      </View> 
      <View style={{marginBottom:20}}>
        <Text>Correo Electronico: </Text>
        <Text>joancarmona05@gmail.com</Text>
      </View>
      <View style={{marginBottom:20}}>
        <Text>Apellido: </Text>
        <Text>Carmona</Text>
      </View>
      <View style={{marginBottom:20}}>
        <Text>Direccion: </Text>
        <Text>C/ MiCasa Nº1</Text>
      </View>
      <View style={{marginBottom:20}}>
        <Text>Nombre: </Text>
        <Text>joan</Text>
      </View>     

      <View style={{alignItems: "center"}}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/7175/7175236.png"
          }}
          style={{height:50,width:50,marginTop:"25%"}} 
        />
      </View>
>>>>>>> Stashed changes
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
});
