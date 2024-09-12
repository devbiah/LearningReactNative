import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

const LandingPage = () => {
    return (
        <View style={styles.container}>
            <Link href="/calculadora">
                <View style={styles.linkContainer}>
                    <Image
                        source={require('../../img/folder.png')}
                        style={styles.image}
                    />
                    <Text>/Calculator</Text>
                </View>
            </Link>
            <Link href="/Bank">
                <View style={styles.linkContainer}>
                    <Image
                        source={require('../../img/folder.png')}
                        style={styles.image}
                    />
                    <Text>/Bank</Text>
                </View>
            </Link>
            <Link href="/lista-tarefa">
                <View style={styles.linkContainer}>
                    <Image
                        source={require('../../img/folder.png')}
                        style={styles.image}
                    />
                    <Text>/Task-List</Text>
                </View>
            </Link>
            <Link href="/PrimeiraCalculadora">
                <View style={styles.linkContainer}>
                    <Image
                        source={require('../../img/folder.png')}
                        style={styles.image}
                    />
                    <Text>/First-Calculator</Text>
                </View>
            </Link>
            <Link href="/registro">
                <View style={styles.linkContainer}>
                    <Image
                        source={require('../../img/folder.png')}
                        style={styles.image}
                    />
                    <Text>/Register</Text>
                </View>
            </Link>
            
            <Link href="/seletor">
                <View style={styles.linkContainer}>
                    <Image
                        source={require('../../img/folder.png')}
                        style={styles.image}
                    />
                    <Text>/Pokemon</Text>
                </View>
                </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    linkContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
    },
});

export default LandingPage;
