import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";
import { FontAwesome } from "@expo/vector-icons";
import Header from '../components/Header';
import Footer from '../components/Footer';
import CompartirQR from '../components/CompartirQR';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/VerclaseStyles';

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

export default Verclase;
