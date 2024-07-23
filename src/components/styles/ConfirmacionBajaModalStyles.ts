import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
