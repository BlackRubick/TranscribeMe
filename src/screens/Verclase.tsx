import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";
import { FontAwesome } from "@expo/vector-icons";
import Header from '../components/Header';
import Footer from '../components/Footer';
import CompartirQR from '../components/CompartirQR';
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
        const response = await fetch('http://10.0.2.2:5000/get_transcriptions'); // Ajusta la URL según sea necesario
        const data = await response.json();
        const courseTranscriptions = data.filter((t: any) => t.course_id === course.id);
        setTranscriptions(courseTranscriptions);
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
              <Text style={styles.transcriptTitle}>Transcripción Guardada</Text>
              <Text style={styles.transcriptSubtitle}>{new Date(transcript.date).toLocaleString()}</Text>
            </View>
            <View style={styles.transcriptIcons}>
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
      <Footer />
    </View>
  );
};

export default Verclase;
