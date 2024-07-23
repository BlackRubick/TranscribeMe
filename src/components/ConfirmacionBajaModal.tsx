import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles/ConfirmacionBajaModalStyles';

type ConfirmacionBajaModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  solicitud: any;
};

const ConfirmacionBajaModal: React.FC<ConfirmacionBajaModalProps> = ({ visible, onClose, onConfirm, solicitud }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <FontAwesome name="times" size={24} color="red" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Solicitud de Baja de Clase</Text>
          <FontAwesome name="check-circle" size={64} color="green" style={styles.modalIcon} />
          <Text style={styles.modalMateria}>Materia: {solicitud.materia}</Text>
          <Text style={styles.modalText}>
            "He completado mis estudios en esta materia y solicito darme de baja de la clase. Acepto la responsabilidad de esta decisión."
          </Text>
          <Text style={styles.modalConfirmText}>¿Confirmar solicitud?</Text>
          <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
            <Text style={styles.confirmButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmacionBajaModal;
