import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router'

const SplashScreen = () => {
  return (
    <LinearGradient
      colors={['#4c669f', '#fff']}
      style={styles.container}
    >
      <Link href="/LandingPage">
        <Image
          source={require('../../img/senai.png')}
          style={styles.image}
        />
      </Link>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width:170,
    height:115,
  },
  text: {
    marginTop: 20,
    fontSize: 20,
    color: '#fff',
  },
});

export default SplashScreen;
