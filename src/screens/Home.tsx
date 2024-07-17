import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home: React.FC<Props> = ({ navigation }) => {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
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

    fetchClasses();
  }, []);

  return (
    <LinearGradient colors={['#5E9CFA', '#8A2BE2']} style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Materias</Text>
        {courses.map((course) => (
          <TouchableOpacity key={course.id} style={styles.courseCard} onPress={() => navigation.navigate('Verclase', { course })}>
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
        ))}
      </ScrollView>

      <Footer />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  title: {
    fontFamily: 'K2D',
    color: 'white',
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  courseCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  courseTitle: {
    fontFamily: 'K2D',
    color: 'black',
    fontSize: 18,
    marginBottom: 8,
  },
  instructor: {
    fontFamily: 'K2D',
    color: 'gray',
    fontSize: 16,
    marginBottom: 8,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  instructorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  studentsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  students: {
    fontFamily: 'K2D',
    color: 'black',
    marginLeft: 4,
  },
});

export default Home;
