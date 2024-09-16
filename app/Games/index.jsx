import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';

export default function Games() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>
                Meu top 5 melhores jogos:
            </Text>

            <View style={styles.itemContainer}>
                <Text style={styles.itemText}>1-Valorant</Text>
                <Image source={require('../../img/valorant.jpg')} style={styles.image} />
                <View style={styles.separator} />
            </View>

            <View style={styles.itemContainer}>
                <Text style={styles.itemText}>2-OneShot</Text>
                <Image source={require('../../img/oneshot.jpg')} style={styles.image} />
                <View style={styles.separator} />
            </View>

            <View style={styles.itemContainer}>
                <Text style={styles.itemText}>3-Minecraft</Text>
                <Image source={require('../../img/minecraft.jpeg')} style={styles.image} />
                <View style={styles.separator} />
            </View>

            <View style={styles.itemContainer}>
                <Text style={styles.itemText}>4-Stardew Valley</Text>
                <Image source={require('../../img/stardewvalley.jpg')} style={styles.image} />
                <View style={styles.separator} />
            </View>

            <View style={styles.itemContainer}>
                <Text style={styles.itemText}>5-Genshin Impact</Text>
                <Image source={require('../../img/genshinimpact.jpg')} style={styles.image} />
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
