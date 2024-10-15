import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { Link } from 'expo-router';

const links = [
    { href: '/iFome', label: '/iFome' },
    { href: '/Camera', label: '/Camera' },
    { href: '/calculadora', label: '/Calculator' },
    { href: '/Bank', label: '/Bank' },
    { href: '/lista-tarefa', label: '/Task-List' },
    { href: '/PrimeiraCalculadora', label: '/First-Calculator' },
    { href: '/registro', label: '/Register' },
    { href: '/seletor', label: '/Pokemon' },
    { href: '/Memories', label: '/Memories' }, 
];

const LandingPage = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={links}
                keyExtractor={(item) => item.href}
                renderItem={({ item }) => (
                    <Link href={item.href} style={styles.link}>
                        <View style={styles.linkContainer}>
                            <Image
                                source={require('../img/folder.png')}
                                style={styles.image}
                            />
                            <Text>{item.label}</Text>
                        </View>
                    </Link>
                )}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        alignItems: 'center',
    },
    link: {
        width: '100%',
    },
    linkContainer: {
        marginBottom: 20,
        alignItems: 'center',
        width: '100%',
    },
    image: {
        width: 50,
        height: 50,
    },
});

export default LandingPage;
