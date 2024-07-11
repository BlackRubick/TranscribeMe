import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import Header from '../components/Header';
import Footer from '../components/Footer';

type LoginRegScreenNavigationProp = StackNavigationProp<RootStackParamList, "LoginReg">;

type Props = {
  navigation: LoginRegScreenNavigationProp;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

const Verclase: React.FC<Props> = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <View style={styles.container}>
      <Header />

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

      <Footer />
    </View>
  );
};

export default Verclase;
