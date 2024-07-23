import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    padding: 20,
  },
  bannerContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
  },
  bannerText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -90 }, { translateY: -15 }],
    fontFamily: 'K2D',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  table: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeaderContainer: {
    backgroundColor: '#f1f1f1',
    width: '40%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableHeader: {
    fontFamily: 'K2D',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  tableCellContainer: {
    width: '60%',
    padding: 10,
  },
  tableCell: {
    fontFamily: 'K2D',
    fontSize: 14,
    color: 'black',
    textAlign: 'justify',
  },
});
