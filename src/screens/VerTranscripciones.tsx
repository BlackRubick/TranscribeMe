import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FontAwesome } from '@expo/vector-icons';

const VerTranscripciones: React.FC = () => {
  return (
    <LinearGradient colors={['#5E9CFA', '#8A2BE2']} style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.classInfoContainer}>
          <Text style={styles.classTitle}>Minería de datos</Text>
          <Text style={styles.classSubtitle}>Horacio Irán Solís Cisneros</Text>
          <View style={styles.classDetails}>
            <FontAwesome name="users" size={20} color="white" />
            <Text style={[styles.classSubtitle, { marginLeft: 5 }]}>22</Text>
          </View>
        </View>
        <View style={styles.transcriptionCard}>
          <Text style={styles.transcriptionTitle}>Título de la transcripción</Text>
          <View style={styles.transcriptionInfo}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../../assets/instructor1.png')} style={styles.transcriptImage} />
              <Text style={styles.transcriptionAuthor}>Horacio Irán Solís Cisneros</Text>
            </View>
            <Text style={styles.transcriptionDate}>01/12/2003</Text>
          </View>
          <Text style={styles.transcriptionText}>
            Estos desafíos interrelacionados subrayan la necesidad urgente de implementar estrategias de conservación efectivas que aborden el cambio climático, protejan y restauren hábitats críticos, y minimicen la depredación y el uso de pesticidas. Solo mediante un enfoque integral y colaborativo podemos asegurar un futuro sostenible para la mariposa monarca y su entorno.
            {'\n\n'}Incremento en la Depredación: La fragmentación del hábitat y los cambios en los ecosistemas han aumentado la vulnerabilidad de las monarcas frente a sus depredadores naturales. National Geographic (2024) destaca que este aumento en la depredación ha sido un factor significativo en la disminución de la población de mariposas monarca. Además, el uso indiscriminado de pesticidas ha afectado negativamente tanto a las plantas hospedadoras.
          </Text>
        </View>
        <TouchableOpacity style={styles.summaryButton}>
          <Text style={styles.summaryButtonText}>Resumen autogenerado</Text>
        </TouchableOpacity>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryText}>
            Estos desafíos interrelacionados subrayan la necesidad urgente de implementar estrategias de conservación efectivas que aborden el cambio climático, protejan y restauren hábitats críticos, y minimicen la depredación y el uso de pesticidas. Solo mediante un enfoque integral y colaborativo podemos asegurar un futuro sostenible para la mariposa monarca y su entorno.
          </Text>
        </View>
      </ScrollView>
      <Footer />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  classInfoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: "#5E9CFA",
    padding: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  classTitle: {
    fontFamily: 'K2D',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  classSubtitle: {
    fontFamily: 'K2D',
    fontSize: 16,
    color: 'white',
  },
  classDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  transcriptionCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  transcriptionTitle: {
    fontFamily: 'K2D',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  transcriptionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  transcriptionAuthor: {
    fontFamily: 'K2D',
    fontSize: 16,
  },
  transcriptionDate: {
    fontFamily: 'K2D',
    fontSize: 16,
    color: "gray",
  },
  transcriptionText: {
    fontFamily: 'K2D',
    fontSize: 16,
    textAlign: 'justify',
  },
  summaryButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
  },
  summaryButtonText: {
    fontFamily: 'K2D',
    fontSize: 16,
    color: 'white',
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  summaryText: {
    fontFamily: 'K2D',
    fontSize: 16,
    textAlign: 'justify',
  },
  transcriptImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});

export default VerTranscripciones;
