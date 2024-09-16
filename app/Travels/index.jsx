import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';

export default function Travels() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>
                Minhas viagens:
            </Text>

            <View style={styles.itemContainer}>
                <Text style={styles.itemText}>Urubici 2024</Text>
                <Image source={require('../../img/urubici.jpg')} style={styles.image} />
                <View style={styles.separator} />
            </View>

            <View style={styles.itemContainer}>
                <Text style={styles.itemText}>Gramado 2023</Text>
                <Image source={require('../../img/gramado.jpg')} style={styles.image} />
                <View style={styles.separator} />
            </View>

            <View style={styles.itemContainer}>
                <Text style={styles.itemText}>Ceará 2022</Text>
                <Image source={require('../../img/canoaquebrada.jpg')} style={styles.image} />
                <View style={styles.separator} />
            </View>

            <View style={styles.itemContainer}>
                <Text style={styles.itemText}>Curitiba 2022</Text>
                <Image source={require('../../img/curitiba.jpg')} style={styles.image} />
                <View style={styles.separator} />
            </View>

            <View style={styles.itemContainer}>
                <Text style={styles.itemText}>Natal 2018</Text>
                <Image source={require('../../img/natal.jpg')} style={styles.image} />
                <View style={styles.separator} />
            </View>

            <View style={styles.itemContainer}>
                <Text style={styles.itemText}>Pernambuco 2016</Text>
                <Image source={require('../../img/pernambuco.jpg')} style={styles.image} />
                <View style={styles.separator} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    itemContainer: {
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
    },
    itemText: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    separator: {
        marginTop: 10,
        height: 1,
        width: '90%',
        backgroundColor: '#ccc',
    },
});
