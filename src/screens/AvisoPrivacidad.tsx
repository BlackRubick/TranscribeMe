import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AvisoPrivacidad: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Placeholder Aviso de Privacidad</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AvisoPrivacidad;
