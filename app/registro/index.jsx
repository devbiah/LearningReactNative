import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');

    const registrarUsuario = async () => {
        if (!nome || !email || !senha) {
            console.log('Os parâmetros nome, email e senha devem ser fornecidos');
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
                console.log('Usuário criado com sucesso');
            } else {
                const errorData = await resposta.json(); // Parse error response
                if (resposta.status === 409) {
                    console.log('Conflito: ', errorData.message || 'Email já cadastrado');
                } else {
                    console.log('Ocorreu um erro: ', errorData.message || 'Erro desconhecido');
                }
            }
        } catch (error) {
            console.log('Erro de rede: ', error);
        }
    };
    

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>Registre-se</Text>
            </View>
            <View>
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
            </View>
            <Pressable style={styles.button} onPress={registrarUsuario}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </Pressable>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#000000',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default SignUp;
