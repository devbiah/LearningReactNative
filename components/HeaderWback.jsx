import React from 'react';
import { View, Text,  StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function HeaderB() {
  return (
    <View style={styles.headerContainer}>
      <Link href="/AboutMe" style={styles.backButton}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </Link>
      <Text style={styles.headerText}>Sobre mim</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    left: 10,
    padding: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
