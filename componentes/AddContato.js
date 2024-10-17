import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from "react-native"; // Adicionando Platform para distinguir entre web e mobile
import { ref, push } from "firebase/database";
import { db } from "../config/config";

class AddContato extends React.Component {
    state = {
        nome: '',
        telefone: ''
    }

    handleAddContato = () => {
        const { nome, telefone } = this.state;
        const telefoneNumerico = telefone.replace(/[^0-9]/g, '');
    
        if (nome.trim() === '' || telefone.trim() === '') {
            if (Platform.OS === 'web') {
                alert('Por favor, preencha todos os campos.'); // Alerta para web
            } else {
                Alert.alert('Por favor, preencha todos os campos.'); // Alerta para mobile
            }
            return;
        }
    
        if (telefoneNumerico.length !== 11) {
            if (Platform.OS === 'web') {
                alert('Formato de telefone inválido.'); // Alerta para web
            } else {
                Alert.alert('Formato de telefone inválido.'); // Alerta para mobile
            }
            return;
        }
    
        const contatosRef = ref(db, '/ContatoItem');
        push(contatosRef, { nome, telefone })
            .then(() => {
                if (Platform.OS === 'web') {
                    alert('Contato adicionado com sucesso!'); // Alerta para web
                } else {
                    Alert.alert('Contato adicionado com sucesso!'); // Alerta para mobile
                }
                this.setState({ nome: '', telefone: '' }); // Limpa os campos após adicionar
                this.props.navigation.navigate('Listagem');
            })
            .catch(error => {
                Alert.alert('Erro ao adicionar contato:', error.message);
            });
    };    

    handleTelefoneChange = (telefone) => {
        const telefoneNumerico = telefone.replace(/[^0-9]/g, '');
        let formattedTelefone = telefoneNumerico;

        if (telefoneNumerico.length > 2 && telefoneNumerico.length <= 7) {
            formattedTelefone = `(${telefoneNumerico.slice(0, 2)}) ${telefoneNumerico.slice(2)}`;
        } else if (telefoneNumerico.length > 7 && telefoneNumerico.length <= 11) {
            formattedTelefone = `(${telefoneNumerico.slice(0, 2)}) ${telefoneNumerico.slice(2, 7)}-${telefoneNumerico.slice(7)}`;
        } else if (telefoneNumerico.length > 11) {
            formattedTelefone = `(${telefoneNumerico.slice(0, 2)}) ${telefoneNumerico.slice(2, 7)}-${telefoneNumerico.slice(7, 11)}`;
        }

        this.setState({ telefone: formattedTelefone });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Adicionar Contato</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nome:</Text>
                    <TextInput
                        style={styles.input}
                        value={this.state.nome}
                        onChangeText={nome => this.setState({ nome })}
                        placeholder="Digite o nome..."
                        placeholderTextColor="#999"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Telefone:</Text>
                    <TextInput
                        style={styles.input}
                        value={this.state.telefone}
                        onChangeText={this.handleTelefoneChange}
                        placeholder="(DDD) 00000-0000"
                        placeholderTextColor="#999"
                        keyboardType="numeric"
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={this.handleAddContato}>
                    <Text style={styles.buttonText}>Adicionar Contato</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#F0F4F8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        alignSelf: 'center',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        color: '#333',
    },
    button: {
        backgroundColor: 'green',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AddContato;