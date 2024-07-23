import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#5E9CFA',
    zIndex: 2,
  },
  menuIcon: {
    marginLeft: 10,
  },
  profileIcon: {
    marginRight: 10,
  },
  headerText: {
    fontFamily: 'K2D',
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    zIndex: 1,
  },
  menu: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 250,
    backgroundColor: 'white',
    paddingTop: 50,
    paddingLeft: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuItemText: {
    fontFamily: 'K2D',
    fontSize: 18,
    color: 'black',
    marginLeft: 10,
  },
});
