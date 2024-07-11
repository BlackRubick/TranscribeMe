import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Ayuda: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Placeholder Ayuda</Text>
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

export default Ayuda;
