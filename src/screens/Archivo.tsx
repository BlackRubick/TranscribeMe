import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/ArchivoStyles';

type ArchivoScreenNavigationProp = StackNavigationProp<RootStackParamList, "Archivo">;

type Props = {
  navigation: ArchivoScreenNavigationProp;
};

const Archivo: React.FC<Props> = ({ navigation }) => {
  const [courses, setCourses] = useState<any[]>([]);

  const fetchArchivedClasses = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('userToken');

      if (!userId || !token) {
        throw new Error('User ID or token not found');
      }

      const myHeaders = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const response = await fetch(`http://10.0.2.2:3004/api/v1/list-users-classes/${userId}`, {
        method: 'GET',
        headers: myHeaders,
      });

      if (response.ok) {
        const data = await response.json();
        const classIds = data.map((item: any) => ({ class_id: item.class_id }));

        const classesResponse = await fetch(`http://10.0.2.2:3004/api/v1/alumno-archivado/users-classes/status`, {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(classIds),
        });

        if (classesResponse.ok) {
          const classesData = await classesResponse.json();
          setCourses(classesData);
        } else {
          throw new Error('Failed to fetch archived classes');
        }
      } else {
        throw new Error('Failed to fetch class IDs');
      }
    } catch (error) {
      console.error("Error fetching archived classes:", error);
      Alert.alert("Error", "Error fetching archived classes");
    }
  };

  useEffect(() => {
    fetchArchivedClasses();
  }, []);

  const handleUnarchive = async (classId: string) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('Token not found');
      }

      const myHeaders = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const response = await fetch(`http://10.0.2.2:3004/api/v1/class/status/${classId}`, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify({ status: "no archivado" }),
      });

      if (response.ok) {
        Alert.alert("Éxito", "Clase desarchivada exitosamente");
        setCourses(courses.filter(course => course.id !== classId));
        navigation.navigate('Home');
      } else {
        throw new Error('Failed to unarchive class');
      }
    } catch (error) {
      console.error("Error unarchiving class:", error);
      Alert.alert("Error", "Error unarchiving class");
    }
  };

  return (
    <LinearGradient colors={['#5E9CFA', '#8A2BE2']} style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Clases Archivadas</Text>
        {courses.map((course, index) => (
          <View key={index} style={styles.courseCard}>
            <Text style={styles.courseTitle}>7B - {course.name}</Text>
            <Text style={styles.instructor}>{course.teacher}</Text>
            <View style={styles.courseFooter}>
              <Image source={course.image} style={styles.instructorImage} />
              <View style={styles.studentsContainer}>
                <FontAwesome name="users" size={16} color="black" />
                <Text style={styles.students}>{course.number_of_students}</Text>
              </View>
              <TouchableOpacity onPress={() => handleUnarchive(course.id)}>
                <Text style={{ color: "blue" }}>Desarchivar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <Footer />
    </LinearGradient>
  );
};

export default Archivo;
