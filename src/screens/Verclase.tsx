import React, { useState } from "react";
import {
  View,
  Text,
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

// Login screen navigation prop type
type LoginRegScreenNavigationProp = StackNavigationProp<RootStackParamList, "LoginReg">;

type Props = {
  navigation: LoginRegScreenNavigationProp;
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
  classInfoContainer: {
    padding: 16,
    backgroundColor: "#8A2BE2",
    borderRadius: 10,
    margin: 16,
    alignItems: "center",
  },
  classTitle: {
    fontFamily: "K2D",
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  classSubtitle: {
    fontFamily: "K2D",
    color: "white",
    fontSize: 16,
  },
  transcriptCard: {
    backgroundColor: "white",
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  transcriptTextContainer: {
    flex: 1,
  },
  transcriptTitle: {
    fontFamily: "K2D",
    fontSize: 16,
    fontWeight: "bold",
  },
  transcriptSubtitle: {
    fontFamily: "K2D",
    fontSize: 14,
    color: "gray",
  },
  transcriptDate: {
    fontFamily: "K2D",
    fontSize: 14,
  },
  transcriptIcons: {
    flexDirection: "row",
    alignItems: "center",
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
});

// Component for each transcript item
interface TranscriptItemProps {
  title: string;
  author: string;
  date: string;
}

const TranscriptItem: React.FC<TranscriptItemProps> = ({ title, author, date }) => (
  <View style={styles.transcriptCard}>
    <View style={styles.transcriptTextContainer}>
      <Text style={styles.transcriptTitle}>{title}</Text>
      <Text style={styles.transcriptSubtitle}>{author}</Text>
    </View>
    <View style={styles.transcriptIcons}>
      <Text style={styles.transcriptDate}>{date}</Text>
      <FontAwesome name="calendar" size={20} color="gray" style={{ marginHorizontal: 5 }} />
      <FontAwesome name="share-alt" size={20} color="gray" />
    </View>
  </View>
);

// Main component Verclase
const Verclase: React.FC<Props> = ({ navigation }) => {
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

      {/* Menu Modal */}
      <Modal
        transparent={true}
        visible={menuVisible}
        animationType="fade"
        onRequestClose={toggleMenu}
      >
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", justifyContent: "flex-start", alignItems: "flex-start" }}>
            <View style={{ backgroundColor: "white", padding: 20, borderRadius: 8, marginTop: 50, marginLeft: 10 }}>
              <TouchableOpacity
                style={{ paddingVertical: 10 }}
                onPress={() => { toggleMenu(); navigation.navigate("Cerrar"); }}
              >
                <Text style={{ fontFamily: "K2D", fontSize: 18, color: "black" }}>Cerrar Sesion</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ paddingVertical: 10 }}
                onPress={() => { toggleMenu(); navigation.navigate("Archivo"); }}
              >
                <Text style={{ fontFamily: "K2D", fontSize: 18, color: "black" }}>Clases Archivadas</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ paddingVertical: 10 }}
                onPress={() => { toggleMenu(); navigation.navigate("Baja"); }}
              >
                <Text style={{ fontFamily: "K2D", fontSize: 18, color: "black" }}>Dar de Baja a una Materia</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ paddingVertical: 10 }}
                onPress={() => { toggleMenu(); navigation.navigate("Create"); }}
              >
                <Text style={{ fontFamily: "K2D", fontSize: 18, color: "black" }}>Crear Clase</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Content */}
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}>
        <View style={styles.classInfoContainer}>
          <Text style={styles.classTitle}>Minería de datos</Text>
          <Text style={styles.classSubtitle}>Horacio Irán Solís Cisneros</Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
            <FontAwesome name="users" size={20} color="white" />
            <Text style={[styles.classSubtitle, { marginLeft: 5 }]}>22</Text>
          </View>
        </View>

        {/* Transcript Items */}
        <TranscriptItem
          title="Título de la transcripción"
          author="Horacio Irán Solís Cisneros"
          date="01/12/2003"
        />
        <TranscriptItem
          title="Título de la transcripción"
          author="Horacio Irán Solís Cisneros"
          date="01/12/2003"
        />
        <TranscriptItem
          title="Título de la transcripción"
          author="Horacio Irán Solís Cisneros"
          date="01/12/2003"
        />
        <TranscriptItem
          title="Título de la transcripción"
          author="Horacio Irán Solís Cisneros"
          date="01/12/2003"
        />
      </ScrollView>

      {/* Footer */}
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

export default Verclase;
