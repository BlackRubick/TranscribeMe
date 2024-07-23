import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import styles from './styles/FooterStyles';

const Footer: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Home')}>
        <FontAwesome name="home" size={24} color="black" />
        <Text style={styles.footerButtonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('JoinClass')}>
        <FontAwesome name="plus" size={24} color="black" />
        <Text style={styles.footerButtonText}>Unirme a clase</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('JoinTranscription')}>
        <FontAwesome name="file-text" size={24} color="black" />
        <Text style={styles.footerButtonText}>Unirme a transcripción</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
