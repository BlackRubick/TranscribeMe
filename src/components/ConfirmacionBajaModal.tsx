import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

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

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontFamily: 'K2D',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  modalIcon: {
    marginBottom: 10,
  },
  modalMateria: {
    fontFamily: 'K2D',
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
  },
  modalText: {
    fontFamily: 'K2D',
    fontSize: 16,
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalConfirmText: {
    fontFamily: 'K2D',
    fontSize: 16,
    color: 'black',
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  confirmButtonText: {
    fontFamily: 'K2D',
    fontSize: 16,
    color: 'white',
  },
});

export default ConfirmacionBajaModal;
