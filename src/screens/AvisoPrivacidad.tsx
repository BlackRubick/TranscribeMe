import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AvisoPrivacidad: React.FC = () => {
  return (
    <LinearGradient colors={['#5E9CFA', '#8A2BE2']} style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.bannerContainer}>
          <Image source={require('../../assets/banner-privacidad.jpg')} style={styles.bannerImage} />
          <View style={styles.overlay} />
          <Text style={styles.bannerText}>Aviso de Privacidad</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableHeaderContainer}>
              <Text style={styles.tableHeader}>¿Quiénes somos?</Text>
            </View>
            <View style={styles.tableCellContainer}>
              <Text style={styles.tableCell}>
                SoftInCraft, con domicilio en Av. Central S/N Colonia Solidaridad, 30470, VILLAFLORES, CHIS. es el responsable del uso y protección de sus datos personales, y al respecto le informamos lo siguiente:
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableHeaderContainer}>
              <Text style={styles.tableHeader}>¿Para qué fines utilizaremos sus datos personales?</Text>
            </View>
            <View style={styles.tableCellContainer}>
              <Text style={styles.tableCell}>
                Los datos personales que recabamos de usted, los utilizaremos para las siguientes finalidades que son necesarias para el servicio que solicita:
                {'\n'}- Proveer el acceso a la plataforma y servicios de TranscribeMe.
                {'\n'}- Almacenar y gestionar las transcripciones de las sesiones para futuras consultas por los usuarios.
                {'\n'}- Realizar evaluaciones y encuestas para asegurar y mejorar la calidad del servicio proporcionado.
                {'\n\n'}De manera adicional, utilizaremos su información personal para las siguientes finalidades que no son necesarias para el servicio solicitado, pero que nos permiten y facilitan brindarle una mejor atención:
                {'\n'}- Analizar el uso de la plataforma para mejorar su funcionamiento y desarrollo de nuevas funcionalidades.
                {'\n'}- Realizar estudios de mercado y análisis estadísticos.
                {'\n\n'}En caso de que no desee que sus datos personales sean tratados para estos fines adicionales, desde este momento usted nos puede comunicar lo anterior, enviando un correo electrónico a SoftInCraft@hotmail.com, indicando claramente su negativa al tratamiento de sus datos para dichas finalidades. También puede solicitar la eliminación de sus datos personales, excepto aquellos necesarios para estadísticas anónimas, directamente desde nuestra aplicación.
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableHeaderContainer}>
              <Text style={styles.tableHeader}>¿Dónde puedo consultar el aviso de privacidad integral?</Text>
            </View>
            <View style={styles.tableCellContainer}>
              <Text style={styles.tableCell}>
                Para conocer mayor información sobre los términos y condiciones en que serán tratados sus datos personales, como los terceros con quienes compartimos su información personal y la forma en que podrá ejercer sus derechos ARCO, puede consultar el aviso de privacidad integral en la sección de "Aviso de Privacidad" dentro de nuestra aplicación o en nuestro sitio web oficial.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <Footer />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
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
    justifyContent: 'center',  // Centra verticalmente
    alignItems: 'center',  // Centra horizontalmente
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

export default AvisoPrivacidad;
