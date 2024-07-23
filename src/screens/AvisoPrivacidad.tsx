import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/AvisoPrivacidadStyles';

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

export default AvisoPrivacidad;
