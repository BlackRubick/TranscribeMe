import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Animated, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useUserStore } from '../store/UserStore';

const Header: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuAnimation] = useState(new Animated.Value(-250));
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const clearUser = useUserStore((state) => state.clear);

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(menuAnimation, {
        toValue: -250,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(menuAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleLogout = () => {
    clearUser();
    navigation.navigate('LoginReg');
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu}>
          <FontAwesome name="bars" size={24} color="white" style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>TranscribeMe</Text>
        <FontAwesome name="user" size={24} color="white" style={styles.profileIcon} />
      </View>

      <Modal
        transparent={true}
        visible={menuVisible}
        animationType="none"
        onRequestClose={toggleMenu}
      >
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={styles.modalOverlay}>
            <Animated.View style={[styles.menu, { transform: [{ translateX: menuAnimation }] }]}>
              <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                <FontAwesome name="sign-out" size={20} color="black" style={styles.menuIcon} />
                <Text style={styles.menuItemText}>Cerrar Sesion</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => { toggleMenu(); navigation.navigate('Archivo'); }}>
                <MaterialIcons name="archive" size={20} color="black" style={styles.menuIcon} />
                <Text style={styles.menuItemText}>Clases Archivadas</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => { toggleMenu(); navigation.navigate('Create'); }}>
                <Ionicons name="create-outline" size={20} color="black" style={styles.menuIcon} />
                <Text style={styles.menuItemText}>Crear Clase</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => { toggleMenu(); navigation.navigate('IniciarTranscripcion'); }}>
                <FontAwesome name="play-circle" size={20} color="black" style={styles.menuIcon} />
                <Text style={styles.menuItemText}>Iniciar transcripción</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => { toggleMenu(); navigation.navigate('SolicitudesBajas'); }}>
                <FontAwesome name="file-text" size={20} color="black" style={styles.menuIcon} />
                <Text style={styles.menuItemText}>Solicitudes de bajas</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => { toggleMenu(); navigation.navigate('Ayuda'); }}>
                <FontAwesome name="question-circle" size={20} color="black" style={styles.menuIcon} />
                <Text style={styles.menuItemText}>Ayuda</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => { toggleMenu(); navigation.navigate('AvisoPrivacidad'); }}>
                <FontAwesome name="file" size={20} color="black" style={styles.menuIcon} />
                <Text style={styles.menuItemText}>Aviso de privacidad</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
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

export default Header;
