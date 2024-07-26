import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import styles from './styles/CompartirQRStyles';

type CompartirQRProps = {
  visible: boolean;
  onClose: () => void;
  transcriptionText: string; // Pass the transcription text as a prop
};

const CompartirQR: React.FC<CompartirQRProps> = ({ visible, onClose, transcriptionText }) => {
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
          <QRCode
            value={transcriptionText}
            size={200}
          />
          <Text style={styles.qrDescription}>
            Escanea este código QR para acceder a la transcripción completa
          </Text>
          <Text style={styles.qrDate}>Generado el: {new Date().toLocaleDateString()}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default CompartirQR;
