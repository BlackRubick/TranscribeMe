import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const courses = [
  { id: 1, title: "Minería de datos", instructor: "Horacio Irán Solís Cisneros", students: 22, image: require('../../assets/instructor1.png') },
  { id: 2, title: "Compiladores e intérpretes", instructor: "Diana Veatriz Vazquez", students: 32, image: require('../../assets/instructor2.png') },
  { id: 3, title: "Probabilidad y Estadística", instructor: "Horacio Irán Solís Cisneros", students: 22, image: require('../../assets/instructor3.png') },
  { id: 4, title: "Programación Móvil", instructor: "Horacio Irán Solís Cisneros", students: 22, image: require('../../assets/instructor4.png') },
  { id: 5, title: "Minería de datos", instructor: "Horacio Irán Solís Cisneros", students: 22, image: require('../../assets/instructor5.png') },
];

const Home: React.FC<Props> = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <LinearGradient
      colors={['#5E9CFA', '#8A2BE2']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu}>
          <FontAwesome name="bars" size={24} color="white" style={styles.menuIcon} />
        </TouchableOpacity>
        
        <Text style={styles.headerText}>TranscribeMe</Text>
        <FontAwesome name="user" size={24} color="white" style={styles.profileIcon} />
      </View>

      <Modal
        transparent={true}
        visible={menuVisible}
        animationType="fade"
        onRequestClose={toggleMenu}
      >
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={styles.modalOverlay}>
            <View style={styles.menu}>
              <TouchableOpacity style={styles.menuItem} onPress={() => { toggleMenu(); navigation.navigate("Cerrar"); }}>
                <Text style={styles.menuItemText}>Cerrar Sesion</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => { toggleMenu(); navigation.navigate("Archivo"); }}>
                <Text style={styles.menuItemText}>Clases Archivadas</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => { toggleMenu(); navigation.navigate("Baja"); }}>
                <Text style={styles.menuItemText}>Dar de Baja a una Materia</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => { toggleMenu(); navigation.navigate("Create"); }}>
                <Text style={styles.menuItemText}>Crear Clase</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Materias</Text>
        {courses.map((course) => (
          <TouchableOpacity key={course.id} style={styles.courseCard} onPress={() => navigation.navigate('Verclase', { course })}>
            <Text style={styles.courseTitle}>7B - {course.title}</Text>
            <Text style={styles.instructor}>{course.instructor}</Text>
            <View style={styles.courseFooter}>
              <Image source={course.image} style={styles.instructorImage} />
              <View style={styles.studentsContainer}>
                <FontAwesome name="users" size={16} color="black" />
                <Text style={styles.students}>{course.students}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: '#5E9CFA',
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
  scrollContainer: {
    padding: 16,
  },
  title: {
    fontFamily: "K2D",
    color: "white",
    fontSize: 20,
    marginBottom: 16,
    textAlign: "center",
  },
  courseCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  courseTitle: {
    fontFamily: "K2D",
    color: "black",
    fontSize: 18,
    marginBottom: 8,
  },
  instructor: {
    fontFamily: "K2D",
    color: "gray",
    fontSize: 16,
    marginBottom: 8,
  },
  courseFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  instructorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  studentsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  students: {
    fontFamily: "K2D",
    color: "black",
    marginLeft: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 16,
    backgroundColor: '#DDDD',
  },
  footerButton: {
    alignItems: "center",
  },
  footerButtonText: {
    fontFamily: "K2D",
    color: "black",
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  menu: {
    backgroundColor: 'white',
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
    color: 'black',
  },
});

export default Home;
