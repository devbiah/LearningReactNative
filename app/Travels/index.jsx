import React from 'react'; 
import { View, Text, Image, FlatList, StyleSheet, Pressable } from 'react-native';
import Header from '../../components/HeaderWback';
import { useRouter } from 'expo-router';

const viagens = [
    { id: '1', title: 'Urubici', year: 2024, image: require('../../img/urubici.jpg') },
    { id: '2', title: 'Gramado', year: 2023, image: require('../../img/gramado.jpg') },
    { id: '3', title: 'Curitiba', year: 2023, image: require('../../img/curitiba.jpg') },
    { id: '4', title: 'Ceará', year: 2023, image: require('../../img/canoaquebrada.jpg') },
    { id: '5', title: 'Pernambuco', year: 2020, image: require('../../img/pernambuco.jpg') },
    { id: '6', title: 'Natal', year: 2018, image: require('../../img/natal.jpg') },
];

const TelaViagens = () => {
    const router = useRouter();

    const navigateToDetails = (id) => {
        router.push(`/details/${id}`);
    };

    return (
        <View style={styles.container}>
            <Header title="<- Viagens" voltarPara="/sobre-mim" />
            <Text style={styles.text1}>Minhas Viagens:</Text>
            <FlatList
                data={viagens}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Pressable onPress={() => navigateToDetails(item.id)} style={styles.card}>
                        <Image source={item.image} style={styles.image} />
                        <Text style={styles.title}>{item.title} - {item.year}</Text>
                    </Pressable>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text1: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 70,
        marginBottom: 1,
        alignSelf: 'center',
    },
    card: {
        marginTop: 20,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 150,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        marginHorizontal: 10,
    },
});

export default TelaViagens;
