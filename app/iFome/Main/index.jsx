import React, { useContext } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Pressable } from 'react-native';
import { AppContext } from '../../../scripts/AppContext';
import { Link } from 'expo-router';

const pratos = [
    { nome: 'Hambúrguer', preco: 'R$48,80', imagem: 'https://as1.ftcdn.net/v2/jpg/04/03/53/00/1000_F_403530013_jwtRkIkmjAUoB8Bjn7mTaiAdoPwSpLDP.jpg' },
    { nome: 'Pizza', preco: 'R$72,00', imagem: 'https://s2-oglobo.glbimg.com/qeY272LDeEyeSg8NTIcU4cEtBV0=/0x452:3584x4447/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2024/Z/H/zmMWBBTuucjAYMr4vS7w/close-up-em-uma-deliciosa-pizza.jpg' },
    { nome: 'Salada', preco: 'R$35,50', imagem: 'https://img.band.uol.com.br/image/2023/09/25/salada-1549_800x450.webp' },
    { nome: 'Sushi', preco: 'R$85,00', imagem: 'https://media-cdn.tripadvisor.com/media/photo-s/12/56/a8/d7/sushi-frito.jpg' },
];

const TelaRestaurante = () => {
    const { carrinho, setCarrinho } = useContext(AppContext);

    const adicionarAoCarrinho = (item) => {
        setCarrinho([...carrinho, item]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Cardápio</Text>
            </View>
            <FlatList
                data={pratos}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.imagem }} style={styles.image} />
                        <Text style={styles.nome}>{item.nome}</Text>
                        <Text style={styles.preco}>{item.preco}</Text>
                        <Pressable 
                            onPress={() => adicionarAoCarrinho(item)} 
                            style={styles.botao}>
                            <Text style={styles.botaoText}>Comprar</Text>
                        </Pressable>
                    </View>
                )}
            />
            <Link href="/iFome/Cart" style={styles.carrinho}>
                Itens no carrinho: {carrinho ? carrinho.length : 0}
            </Link>
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
        padding: 15,
        alignItems: 'center',
    },
    headerText: {
        color: '#FFFFFF', 
        fontSize: 24,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        margin: 10,
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
    botao: {
        backgroundColor: '#FF0000',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
    },
    botaoText: {
        color: '#FFFFFF', 
        fontSize: 16,
        fontWeight: 'bold',
    },
    carrinho: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
        color: '#FF0000',
    },
});

export default TelaRestaurante;
