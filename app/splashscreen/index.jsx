import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SplashScreen = () => {
  return (
    <LinearGradient 
      colors={['#4c669f', '#fff']}
      style={styles.container}
    >
      <Image 
        source={require('../../img/blohsh.png')}
        style={styles.image}
      />
      <Text style={styles.text}>Welcome to My Calculator</Text>
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
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  text: {
    marginTop: 20,
    fontSize: 20,
    color: '#fff',
  },
});

export default SplashScreen;
