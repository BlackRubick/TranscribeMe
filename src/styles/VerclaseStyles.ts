import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  classInfoContainer: {
    padding: 16,
    backgroundColor: "#8A2BE2",
    borderRadius: 10,
    margin: 16,
    alignItems: "center",
  },
  classTitle: {
    fontFamily: "K2D",
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  classSubtitle: {
    fontFamily: "K2D",
    color: "white",
    fontSize: 16,
  },
  classDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  classCodeContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 5,
    marginLeft: 10,
  },
  classCode: {
    fontFamily: 'K2D',
    color: '#8A2BE2',
    fontWeight: 'bold',
  },
  transcriptCard: {
    backgroundColor: "white",
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  transcriptTextContainer: {
    flex: 1,
  },
  transcriptTitle: {
    fontFamily: "K2D",
    fontSize: 16,
    fontWeight: "bold",
  },
  transcriptSubtitle: {
    fontFamily: "K2D",
    fontSize: 14,
    color: "gray",
  },
  transcriptDate: {
    fontFamily: "K2D",
    fontSize: 14,
  },
  transcriptIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  transcriptionButton: {
    backgroundColor: '#5E9CFA',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 20,
    alignItems: 'center',
  },
  transcriptionButtonText: {
    fontFamily: 'K2D',
    color: 'white',
    fontSize: 16,
  }
});
