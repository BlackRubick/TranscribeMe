import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";

//login
type LoginRegScreenNavigationProp = StackNavigationProp<RootStackParamList, "LoginReg">;

type Props = {
  navigation: LoginRegScreenNavigationProp;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between", // Ensures content is spaced out with footer at the bottom
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#5E9CFA",
  },
  menuIcon: {
    marginLeft: 10,
  },
  profileIcon: {
    marginRight: 10,
  },
  headerText: {
    fontFamily: "K2D",
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  formContainer: {
    margin: 20,
    backgroundColor: "#92C4FF",
    borderRadius: 20,
    padding: 20,
  },
  formHeader: {
    fontFamily: "K2D",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign:"center",
  },
  input: {
    fontFamily: "K2D",
    fontSize: 15,
    color: "black",
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "white",
  },
  createButton: {
    backgroundColor: "#8A2BE2",
    paddingVertical: 12,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  createButtonText: {
    fontFamily: "K2D",
    color: "white",
    fontSize: 15,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  footerButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  footerButtonText: {
    fontFamily: "K2D",
    color: "black",
    fontSize: 15,
  },
  illustration: {
    width: 150,
    height: 150,
    marginVertical: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  menu: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    marginTop: 50,
    marginLeft: 10,
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuItemText: {
    fontFamily: "K2D",
    fontSize: 18,
    color: "black",
  },
});

const Create: React.FC<Props> = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#5E9CFA", "#8A2BE2"]}
        style={styles.header}
      >
        <TouchableOpacity onPress={toggleMenu}>
          <FontAwesome name="bars" size={24} color="white" style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>TranscribeMe</Text>
        <FontAwesome name="user" size={24} color="white" style={styles.profileIcon} />
      </LinearGradient>

      <Modal
        transparent={true}
        visible={menuVisible}
        animationType="fade"
        onRequestClose={toggleMenu}
      >
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={styles.modalOverlay}>
            <View style={styles.menu}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => { toggleMenu(); navigation.navigate("Cerrar"); }}
              >
                <Text style={styles.menuItemText}>Cerrar Sesion</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => { toggleMenu(); navigation.navigate("Archivo"); }}
              >
                <Text style={styles.menuItemText}>Clases Archivadas</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => { toggleMenu(); navigation.navigate("Baja"); }}
              >
                <Text style={styles.menuItemText}>Dar de Baja a una Materia</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => { toggleMenu(); navigation.navigate("Create"); }}
              >
                <Text style={styles.menuItemText}>Crear Clase</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View style={{ alignItems: "center" }}>
        <Image source={require("../../assets/create.png")} style={styles.illustration} />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formHeader}>Crear clase</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre de la clase"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Grado"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Grupo"
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Crear</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate("Home")}>
          <FontAwesome name="home" size={24} color="black" />
          <Text style={styles.footerButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate("Home")}>
          <FontAwesome name="plus" size={24} color="black" />
          <Text style={styles.footerButtonText}>Unirme a clase</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate("Home")}>
          <FontAwesome name="file-text" size={24} color="black" />
          <Text style={styles.footerButtonText}>Unirme a transcripción</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Create;
