import { StyleSheet } from "react-native";

export default StyleSheet.create({
  uploadIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  text: {
    fontFamily: "K2D",
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
  textRegister: {
    fontFamily: "K2D",
    color: "black",
    fontSize: 15,
    textAlign: "center",
  },
  textQuestion: {
    fontFamily: "K2D",
    color: "black",
    fontSize: 15,
    textAlign: "center",
    paddingBottom: 10,
  },
  input: {
    fontFamily: "K2D",
    fontSize: 15,
    color: "black",
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "white"
  },
  imageBackground: {
    width: '100%',
    height: '40%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  headerText: {
    fontFamily: "K2D",
    color: "#6006B9",
    fontSize: 50,
    fontWeight: "bold",
    position: 'absolute',
    top: 70,
    textAlign: 'center'
  },
  welcomeText: {
    fontFamily: "K2D",
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
    textAlign: "center"
  },
  buttonText: {
    fontFamily: "K2D",
    color: "white",
    fontSize: 15,
    textAlign: "center"
  },
  buttonActive: {
    backgroundColor: "#8A2BE2",
    paddingVertical: 12,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    width: "50%"
  },
  buttonInactive: {
    backgroundColor: "#D3D3D3",
    paddingVertical: 12,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    width: "50%"
  },
  loginContainer: {
    width: '80%',
    paddingHorizontal: 20,
    paddingVertical: 80,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '20%',
    backgroundColor: 'white',
    left: "10%"
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  rectangleContainer: {
    width: 179,
    height: 35,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  rectangleText: {
    fontFamily: "K2D",
    fontSize: 15,
    color: "black",
    textAlign: "center",
  }
});
