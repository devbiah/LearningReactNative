import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
    },
    picker: {
        width: 200,
        height: 50,
    },
    result: {
        marginTop: 20,
        fontSize: 16,
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 20,
    },
});

const Seletor = () => {
    const [pokemonType, setPokemonType] = useState('');
    const [pokemons, setPokemons] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState('');
    const [pokemonImage, setPokemonImage] = useState('');
    const [types, setTypes] = useState([]);

    // Efeito para buscar os tipos de Pokémon quando o componente é montado
    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/type');
                const data = await response.json();
                setTypes(data.results);
            } catch (error) {
                console.error('Erro ao buscar tipos de Pokémon:', error);
            }
        };

        fetchTypes();
    }, []);

    // Efeito para buscar Pokémons de acordo com o tipo selecionado
    useEffect(() => {
        const fetchPokemons = async () => {
            if (pokemonType) {
                try {
                    const response = await fetch(`https://pokeapi.co/api/v2/type/${pokemonType}`);
                    const data = await response.json();
                    // Filtra os Pokémons do tipo selecionado
                    const filteredPokemons = data.pokemon.slice(0, 100).map((poke) => ({
                        nome: poke.pokemon.name,
                        value: poke.pokemon.name,
                    }));
                    setPokemons(filteredPokemons);
                } catch (error) {
                    console.error('Erro ao buscar Pokémons:', error);
                }
            }
        };

        fetchPokemons();
    }, [pokemonType]);

    // Efeito para buscar a imagem do Pokémon selecionado
    useEffect(() => {
        const fetchPokemonImage = async () => {
            if (selectedPokemon) {
                try {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`);
                    const data = await response.json();
                    setPokemonImage(data.sprites.front_default);
                } catch (error) {
                    console.error('Erro ao buscar imagem do Pokémon:', error);
                }
            }
        };

        fetchPokemonImage();
    }, [selectedPokemon]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Selecione um Tipo</Text>
            <Picker
                selectedValue={pokemonType}
                style={styles.picker}
                onValueChange={(itemValue) => {
                    setPokemonType(itemValue);
                    setSelectedPokemon('');
                    setPokemonImage('');
                }}
            >
                <Picker.Item label="Selecione um Tipo" value="" />
                {types.map((type) => (
                    <Picker.Item key={type.name} label={type.name} value={type.name} />
                ))}
            </Picker>

            {pokemonType ? (
                <View>
                    <Text style={styles.title}>Selecione um Pokémon</Text>
                    <Picker
                        selectedValue={selectedPokemon}
                        style={styles.picker}
                        onValueChange={(itemValue) => setSelectedPokemon(itemValue)}
                    >
                        <Picker.Item label="Selecione um Pokémon" value="" />
                        {pokemons.map((pokemon) => (
                            <Picker.Item key={pokemon.value} label={pokemon.nome} value={pokemon.value} />
                        ))}
                    </Picker>
                </View>
            ) : null}

            {selectedPokemon ? (
                <View>
                    <Text style={styles.result}>Você selecionou: {selectedPokemon}</Text>
                    {pokemonImage ? (
                        <Image source={{ uri: pokemonImage }} style={styles.image} />
                    ) : (
                        <Text>Carregando imagem...</Text>
                    )}
                </View>
            ) : null}

        </View>
    );
};

export default Seletor;
