import React from 'react';
import { View, Text, TouchableOpacity, Modal, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles/CompartirQRStyles';

type CompartirQRProps = {
  visible: boolean;
  onClose: () => void;
};

const CompartirQR: React.FC<CompartirQRProps> = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.qrContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <FontAwesome name="close" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.qrTitle}>Compartir QR de transcripción</Text>
          <Image source={require('../../assets/qr-code.png')} style={styles.qrImage} />
          <Text style={styles.qrDescription}>
            Escanea este código QR para acceder a la transcripción completa
          </Text>
          <Text style={styles.qrAuthor}>Autor: Horacio Irán Solís Cisneros</Text>
          <Text style={styles.qrDate}>Generado el: 12/06/2024</Text>
        </View>
      </View>
    </Modal>
  );
};

export default CompartirQR;
