import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import Header from '../components/Header';
import Footer from '../components/Footer';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const courses = [
  { id: 1, title: 'Minería de datos', instructor: 'Horacio Irán Solís Cisneros', students: 22, image: require('../../assets/instructor1.png') },
  { id: 2, title: 'Compiladores e intérpretes', instructor: 'Diana Veatriz Vazquez', students: 32, image: require('../../assets/instructor2.png') },
  { id: 3, title: 'Probabilidad y Estadística', instructor: 'Horacio Irán Solís Cisneros', students: 22, image: require('../../assets/instructor3.png') },
  { id: 4, title: 'Programación Móvil', instructor: 'Horacio Irán Solís Cisneros', students: 22, image: require('../../assets/instructor4.png') },
  { id: 5, title: 'Minería de datos', instructor: 'Horacio Irán Solís Cisneros', students: 22, image: require('../../assets/instructor5.png') },
];

const Home: React.FC<Props> = ({ navigation }) => {
  return (
    <LinearGradient colors={['#5E9CFA', '#8A2BE2']} style={styles.container}>
      <Header />

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
