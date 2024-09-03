import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const registrarUsuario = async () => {
        if (!nome || !email || !senha) {
            setModalMessage('Os parâmetros nome, email e senha devem ser fornecidos');
            setModalVisible(true);
            return;
        }

        try {
            const resposta = await fetch('https://taskhub-s37f.onrender.com/auth/signup', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: nome, email: email, password: senha }),
            });

            if (resposta.ok) {
                setModalMessage('Usuário criado com sucesso');
            } else {
                const errorData = await resposta.json();
                if (resposta.status === 409) {
                    setModalMessage('Conflito: ' + (errorData.message || 'Email já cadastrado'));
                } else {
                    setModalMessage('Ocorreu um erro: ' + (errorData.message || 'Erro desconhecido'));
                }
            }
        } catch (error) {
            setModalMessage('Erro de rede: ' + error.message);
        } finally {
            setModalVisible(true);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Registre-se</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setNome(text)}
                    value={nome}
                    placeholder="Insira seu nome aqui"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="Insira seu e-mail aqui"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setSenha(text)}
                    value={senha}
                    placeholder="Insira sua senha aqui"
                    secureTextEntry={true}
                />
                <Pressable style={styles.button} onPress={registrarUsuario}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </Pressable>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>{modalMessage}</Text>
                        <Pressable
                            style={styles.modalButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.modalButtonText}>Fechar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#7F2026',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 5,
        marginBottom: 15,
        color: '#fff',
        alignSelf: 'stretch',
        marginHorizontal: 20,
    },
    button: {
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 50,
        backgroundColor: '#000000',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch', 
        marginHorizontal: 20,  
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#000000',
        borderRadius: 5,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default SignUp;
