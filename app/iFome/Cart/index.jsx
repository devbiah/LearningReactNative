import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Pressable } from 'react-native';
import { AppContext } from '../../../scripts/AppContext';
import { useRouter } from 'expo-router';

const CartScreen = () => {
    const { carrinho, setCarrinho } = useContext(AppContext);
    const [compraRealizada, setCompraRealizada] = useState(false);
    const router = useRouter();

    const handleCompra = () => {
        setCarrinho([]);
        setCompraRealizada(true);
    };

    const handleVoltar = () => {
        router.push('/iFome');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={handleVoltar} style={styles.botaoVoltar}>
                    <Text style={styles.botaoText}>Voltar</Text>
                </Pressable>
                <Text style={styles.headerText}>Carrinho</Text>
                <View style={styles.placeholder} />
            </View>
            {compraRealizada ? (
                <Text style={styles.successMessage}>Sua compra foi realizada com sucesso!</Text>
            ) : carrinho.length === 0 ? (
                <Text style={styles.empty}>Seu carrinho está vazio.</Text>
            ) : (
                <FlatList
                    data={carrinho}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image source={{ uri: item.imagem }} style={styles.image} />
                            <Text style={styles.nome}>{item.nome}</Text>
                            <Text style={styles.preco}>{item.preco}</Text>
                        </View>
                    )}
                />
            )}
            {!compraRealizada && (
                <Pressable onPress={handleCompra} style={styles.botaoComprar}>
                    <Text style={styles.botaoText}>Comprar</Text>
                </Pressable>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    header: {
        backgroundColor: '#FF0000',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    headerText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    botaoVoltar: {
        backgroundColor: '#FF0000',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    placeholder: {
        width: 80, 
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginVertical: 10,
        padding: 10,
        alignItems: 'center',
        elevation: 2,
    },
    image: {
        width: 200,
        height: 150,
        borderRadius: 8,
    },
    nome: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    preco: {
        fontSize: 16,
        color: '#888',
    },
    empty: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    successMessage: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: '#4CAF50',
    },
    botaoComprar: {
        backgroundColor: '#FF0000',
        borderRadius: 8,
        width: 500,
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
        alignItems: 'center',
    },
    botaoText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CartScreen;
