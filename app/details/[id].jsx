import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';  
import HeaderB from '../../components/HeaderWback';
import { useLocalSearchParams } from 'expo-router';

const viagens = [
  { id: '1', title: 'Urubici', year: 2024, image: require('../../img/urubici.jpg'), description: 'Urubici é um município brasileiro no estado de Santa Catarina, conhecido por suas paisagens naturais e clima frio.' },
  { id: '2', title: 'Gramado', year: 2023, image: require('../../img/gramado.jpg'), description: 'Gramado é uma cidade charmosa em Rio Grande do Sul, famosa por suas festividades e arquitetura europeia.' },
  { id: '3', title: 'Curitiba', year: 2023, image: require('../../img/curitiba.jpg'), description: 'Curitiba é a capital do estado do Paraná, conhecida por seu planejamento urbano e parques.' },
  { id: '4', title: 'Ceará', year: 2023, image: require('../../img/canoaquebrada.jpg'), description: 'Ceará é um estado no nordeste do Brasil, famoso por suas praias e clima quente.' },
  { id: '5', title: 'Pernambuco', year: 2020, image: require('../../img/pernambuco.jpg'), description: 'Pernambuco é um estado do nordeste brasileiro, conhecido por sua rica cultura e belas praias.' },
  { id: '6', title: 'Natal', year: 2018, image: require('../../img/natal.jpg'), description: 'Natal é a capital do estado do Rio Grande do Norte, famosa por suas praias e clima tropical.' },
];

export default function TravelDetail() {
  const { id } = useLocalSearchParams(); 
  const viagem = viagens.find(v => v.id === id);  

  if (!viagem) {
    return (
      <View style={styles.container}>
        <HeaderB />
        <Text style={styles.errorText}>Viagem não encontrada.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <HeaderB />
      <Image source={viagem.image} style={styles.image} />
      <Text style={styles.title}>{viagem.title}</Text>
      <Text style={styles.year}>{viagem.year}</Text>
      <Text style={styles.description}>{viagem.description || "Descrição não disponível."}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5', 
  },
  image: {
    width: '100%',
    marginTop:60,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  year: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333', 
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
