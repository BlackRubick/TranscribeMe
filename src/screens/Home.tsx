import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/HomeStyles';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home: React.FC<Props> = ({ navigation }) => {
  const [courses, setCourses] = useState<any[]>([]);

  const fetchClasses = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('userToken');

      if (!userId || !token) {
        throw new Error('User ID or token not found');
      }

      console.log("User ID:", userId);
      console.log("Token:", token);

      const myHeaders = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const response = await fetch(`http://10.0.2.2:3004/api/v1/list-users-classes/${userId}`, {
        method: 'GET',
        headers: myHeaders,
      });

      console.log("Class IDs response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Class IDs data:", data);

        if (data.length === 0) {
          console.log("No class IDs found for user");
          return;
        }

        const classIds = data.map((item: any) => ({ class_id: item.class_id }));
        console.log("Mapped class IDs:", classIds);

        const classesResponse = await fetch(`http://10.0.2.2:3004/api/v1/alumno-no-archivado/users-classes/status`, {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(classIds),
        });

        console.log("Classes response status:", classesResponse.status);

        if (classesResponse.ok) {
          const classesData = await classesResponse.json();
          console.log("Classes data:", classesData);
          setCourses(classesData);
        } else {
          const errorText = await classesResponse.text();
          console.error("Failed to fetch classes:", errorText);
          throw new Error('Failed to fetch classes');
        }
      } else {
        const errorText = await response.text();
        console.error("Failed to fetch class IDs:", errorText);
        throw new Error('Failed to fetch class IDs');
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
      Alert.alert("Error", "Error fetching classes");
    }
  };

  useEffect(() => {
    fetchClasses();
    const unsubscribe = navigation.addListener('focus', () => {
      fetchClasses();
    });
    return unsubscribe;
  }, []);

  const handleArchiveClass = async (classId: string) => {
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
        body: JSON.stringify({ status: 'archivado' }),
      });

      if (response.ok) {
        Alert.alert("Éxito", "Clase archivada exitosamente");
        fetchClasses();
      } else {
        const errorText = await response.text();
        console.error("Failed to archive class:", errorText);
        throw new Error('Failed to archive class');
      }
    } catch (error) {
      console.error("Error archiving class:", error);
      Alert.alert("Error", "Error archiving class");
    }
  };

  return (
    <LinearGradient colors={['#5E9CFA', '#8A2BE2']} style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Materias</Text>
        {courses.map((course) => (
          <View key={course.id} style={styles.courseCard}>
            <TouchableOpacity onPress={() => navigation.navigate('Verclase', { course })}>
              <Text style={styles.courseTitle}>{course.grade}B - {course.name}</Text>
              <Text style={styles.instructor}>{course.teacher}</Text>
              <View style={styles.courseFooter}>
                <Image source={require('../../assets/instructor1.png')} style={styles.instructorImage} />
                <View style={styles.studentsContainer}>
                  <FontAwesome name="users" size={16} color="black" />
                  <Text style={styles.students}>{course.number_of_students}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleArchiveClass(course.id)}>
              <Text style={styles.archiveButton}>Archivar clase</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Footer />
    </LinearGradient>
  );
};

export default Home;
