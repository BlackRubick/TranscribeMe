import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FontAwesome } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { StackNavigationProp } from '@react-navigation/stack';

type VerTranscripcionesScreenNavigationProp = StackNavigationProp<RootStackParamList, "VerTranscripciones">;
type VerTranscripcionesRouteProp = RouteProp<RootStackParamList, "VerTranscripciones">;

type Props = {
  navigation: VerTranscripcionesScreenNavigationProp;
  route: VerTranscripcionesRouteProp;
};

const VerTranscripciones: React.FC<Props> = ({ route, navigation }) => {
  const { transcript } = route.params;

  return (
    <LinearGradient colors={['#5E9CFA', '#8A2BE2']} style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.classInfoContainer}>
          <Text style={styles.classTitle}>{transcript.class}</Text>
          <Text style={styles.classSubtitle}>{transcript.teacher}</Text>
          <View style={styles.classDetails}>
            <FontAwesome name="users" size={20} color="white" />
            <Text style={[styles.classSubtitle, { marginLeft: 5 }]}>{transcript.students}</Text>
          </View>
        </View>
        <View style={styles.transcriptionCard}>
          <Text style={styles.transcriptionTitle}>{transcript.title}</Text>
          <View style={styles.transcriptionInfo}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={{ uri: transcript.image }} style={styles.transcriptImage} />
              <Text style={styles.transcriptionAuthor}>{transcript.author}</Text>
            </View>
            <Text style={styles.transcriptionDate}>{transcript.date}</Text>
          </View>
          <Text style={styles.transcriptionText}>{transcript.description}</Text>
        </View>
        <TouchableOpacity style={styles.summaryButton}>
          <Text style={styles.summaryButtonText}>Resumen autogenerado</Text>
        </TouchableOpacity>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryText}>{transcript.summary}</Text>
        </View>
        <TouchableOpacity style={styles.shareButton} onPress={() => { /* Lógica para compartir QR */ }}>
          <FontAwesome name="qrcode" size={24} color="white" />
          <Text style={styles.shareButtonText}>Compartir QR</Text>
        </TouchableOpacity>
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
  shareButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  shareButtonText: {
    fontFamily: 'K2D',
    fontSize: 16,
    color: 'white',
    marginLeft: 10,
  },
});

export default VerTranscripciones;
