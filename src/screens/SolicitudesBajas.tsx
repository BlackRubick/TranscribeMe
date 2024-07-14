import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConfirmacionBajaModal from '../components/ConfirmacionBajaModal';

interface Solicitud {
  id: number;
  alumno: string;
  materia: string;
}

const solicitudes: Solicitud[] = [
  { id: 1, alumno: 'José Manuel Galindo González', materia: 'Matemáticas discretas - 7B' },
  { id: 2, alumno: 'José Manuel Galindo González', materia: 'Matemáticas discretas - 7B' },
  { id: 3, alumno: 'José Manuel Galindo González', materia: 'Matemáticas discretas - 7B' },
  { id: 4, alumno: 'José Manuel Galindo González', materia: 'Matemáticas discretas - 7B' },
  { id: 5, alumno: 'José Manuel Galindo González', materia: 'Matemáticas discretas - 7B' },
];

const SolicitudesBajas: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState<Solicitud | null>(null);

  const openModal = (solicitud: Solicitud) => {
    setSelectedSolicitud(solicitud);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedSolicitud(null);
  };

  const confirmBaja = () => {
    // Aquí puedes manejar la lógica de confirmar la baja
    console.log('Baja confirmada para:', selectedSolicitud);
    closeModal();
  };

  return (
    <LinearGradient colors={['#5E9CFA', '#8A2BE2']} style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Solicitudes de Bajas de Alumnos</Text>
        {solicitudes.map((solicitud) => (
          <View key={solicitud.id} style={styles.solicitudCard}>
            <Text style={styles.solicitudText}><FontAwesome name="user" size={16} /> Alumno: {solicitud.alumno}</Text>
            <Text style={styles.solicitudText}><FontAwesome name="book" size={16} /> Materia: {solicitud.materia}</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.rejectButton}>
                <FontAwesome name="times" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.acceptButton} onPress={() => openModal(solicitud)}>
                <FontAwesome name="check" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <Text style={styles.subtitle}>Ayer</Text>
        {solicitudes.map((solicitud) => (
          <View key={solicitud.id + 5} style={styles.solicitudCard}>
            <Text style={styles.solicitudText}><FontAwesome name="user" size={16} /> Alumno: {solicitud.alumno}</Text>
            <Text style={styles.solicitudText}><FontAwesome name="book" size={16} /> Materia: {solicitud.materia}</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.rejectButton}>
                <FontAwesome name="times" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.acceptButton} onPress={() => openModal(solicitud)}>
                <FontAwesome name="check" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <Footer />
      {selectedSolicitud && (
        <ConfirmacionBajaModal
          visible={modalVisible}
          onClose={closeModal}
          onConfirm={confirmBaja}
          solicitud={selectedSolicitud}
        />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'K2D',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  solicitudCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  solicitudText: {
    fontFamily: 'K2D',
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rejectButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
  },
  acceptButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
  },
  subtitle: {
    fontFamily: 'K2D',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'left',
    width: '90%',
  },
});

export default SolicitudesBajas;
