import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  title: {
    fontFamily: "K2D",
    color: "white",
    fontSize: 20,
    marginBottom: 16,
    textAlign: "right",
  },
  courseCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  courseTitle: {
    fontFamily: "K2D",
    color: "black",
    fontSize: 18,
    marginBottom: 8,
  },
  instructor: {
    fontFamily: "K2D",
    color: "gray",
    fontSize: 16,
    marginBottom: 8,
  },
  courseFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  instructorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  studentsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  students: {
    fontFamily: "K2D",
    color: "black",
    marginLeft: 4,
  },
});
