import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View style={styles.container}>
      <Image source={require('../../img/eu.jpeg')} style={styles.profileImage} />
      <Text style={styles.title}>Bem-vindo(a) ao meu app</Text>
      <Text style={styles.description}>
        Me chamo Beatriz, amo jogar Valorant, desenhar e conversar com meus amigos!
      </Text>
      <Link href="/Games" style={styles.button}>
        <Text style={styles.buttonText}>Veja os jogos que já joguei</Text>
      </Link>
      <Link href="/Travels" style={styles.button}>
        <Text style={styles.buttonText}>Veja minhas viagens</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    borderRadius: Dimensions.get('window').width * 0.25,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#6200ee',
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
