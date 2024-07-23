import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  qrContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '80%',
  },
  qrTitle: {
    fontFamily: "K2D",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  qrImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  qrDescription: {
    fontFamily: "K2D",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  qrAuthor: {
    fontFamily: "K2D",
    fontSize: 14,
    marginBottom: 5,
  },
  qrDate: {
    fontFamily: "K2D",
    fontSize: 14,
  },
  closeButton: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "#8A2BE2",
    padding: 10,
    borderRadius: 50,
    zIndex: 1,
  }
});
