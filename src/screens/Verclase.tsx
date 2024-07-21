import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import Header from '../components/Header';
import Footer from '../components/Footer';
import CompartirQR from '../components/CompartirQR';
import AsyncStorage from '@react-native-async-storage/async-storage';

type VerClaseScreenNavigationProp = StackNavigationProp<RootStackParamList, "Verclase">;
type VerClaseRouteProp = RouteProp<RootStackParamList, "Verclase">;

type Props = {
  navigation: VerClaseScreenNavigationProp;
  route: VerClaseRouteProp;
};

const Verclase: React.FC<Props> = ({ route, navigation }) => {
  const { course } = route.params;
  const [transcriptions, setTranscriptions] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchTranscriptions = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          throw new Error('Token not found');
        }

        const myHeaders = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        const response = await fetch(`http://10.0.2.2:3004/api/v1/transcription/${course.id}`, {
          method: 'GET',
          headers: myHeaders,
        });

        if (response.ok) {
          const data = await response.json();
          setTranscriptions(data);
        } else {
          throw new Error('Failed to fetch transcriptions');
        }
      } catch (error) {
        console.error("Error fetching transcriptions:", error);
        Alert.alert("Error", "Error fetching transcriptions");
      }
    };

    fetchTranscriptions();
  }, [course.id]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}>
        <View style={styles.classInfoContainer}>
          <Text style={styles.classTitle}>{course.name}</Text>
          <Text style={styles.classSubtitle}>{course.teacher}</Text>
          <View style={styles.classDetails}>
            <FontAwesome name="users" size={20} color="white" />
            <Text style={[styles.classSubtitle, { marginLeft: 5 }]}>{course.number_of_students}</Text>
            <View style={styles.classCodeContainer}>
              <Text style={styles.classCode}>{course.code}</Text>
            </View>
          </View>
        </View>
        {transcriptions.map((transcript) => (
          <TouchableOpacity key={transcript.id} onPress={() => navigation.navigate('VerTranscripciones', { transcript })} style={styles.transcriptCard}>
            <View style={styles.transcriptTextContainer}>
              <Text style={styles.transcriptTitle}>{transcript.title}</Text>
              <Text style={styles.transcriptSubtitle}>{transcript.author}</Text>
            </View>
            <View style={styles.transcriptIcons}>
              <Text style={styles.transcriptDate}>{transcript.date}</Text>
              <FontAwesome name="calendar" size={20} color="gray" style={{ marginHorizontal: 5 }} />
              <TouchableOpacity onPress={toggleModal}>
                <FontAwesome name="share-alt" size={20} color="gray" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity 
          style={styles.transcriptionButton}
          onPress={() => navigation.navigate('IniciarTranscripcion', { course })}
        >
          <Text style={styles.transcriptionButtonText}>Iniciar Transcripción</Text>
        </TouchableOpacity>
      </ScrollView>
      <CompartirQR visible={modalVisible} onClose={toggleModal} />
      <Footer />
    </View>
  );
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
  classDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  classCodeContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 5,
    marginLeft: 10,
  },
  classCode: {
    fontFamily: 'K2D',
    color: '#8A2BE2',
    fontWeight: 'bold',
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
  transcriptionButton: {
    backgroundColor: '#5E9CFA',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 20,
    alignItems: 'center',
  },
  transcriptionButtonText: {
    fontFamily: 'K2D',
    color: 'white',
    fontSize: 16,
  }
});

export default Verclase;
