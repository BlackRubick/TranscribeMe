import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SolicitudesBajas: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Placeholder Solicitudes de Bajas</Text>
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

export default SolicitudesBajas;
