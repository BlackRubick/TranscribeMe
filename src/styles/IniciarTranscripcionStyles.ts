import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  courseTitle: {
    fontFamily: 'K2D',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  instructorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  instructorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  instructorName: {
    fontFamily: 'K2D',
    fontSize: 16,
    color: 'white',
    marginRight: 10,
  },
  liveText: {
    fontFamily: 'K2D',
    fontSize: 16,
    color: 'lightgreen',
  },
  recorderImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  transcriptionBox: {
    fontFamily: 'K2D',
    fontSize: 16,
    color: 'black',
    backgroundColor: 'white',
    width: '100%',
    height: 200,
    padding: 10,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  stopButton: {
    backgroundColor: '#ff0000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  startButtonText: {
    fontFamily: 'K2D',
    fontSize: 16,
    color: 'white',
  },
  stopButtonText: {
    fontFamily: 'K2D',
    fontSize: 16,
    color: 'white',
  },
});
