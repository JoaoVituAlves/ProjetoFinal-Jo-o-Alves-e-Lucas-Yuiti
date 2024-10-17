import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from "react-native";
import { db } from "../config/config";
import { ref, update } from "firebase/database";

class EditContato extends React.Component {
    state = {
        nome: '',
        telefone: ''
    }

    componentDidMount() {
        this.carregarInformacoesContato();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.route.params?.contato !== this.props.route.params?.contato) {
            this.limparEstado();
            this.carregarInformacoesContato();
        }
    }

    limparEstado() {
        this.setState({ nome: '', telefone: '' });
    }

    carregarInformacoesContato() {
        const { contato } = this.props.route.params || {};
        if (contato) {
            const { nome, telefone } = contato;
            this.setState({ nome, telefone });
        }
    }

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

    atualizarContato = () => {
        const { nome, telefone } = this.state;
        const { contato } = this.props.route.params || {};
        const { id } = contato || {};
        const telefoneNumerico = telefone.replace(/[^0-9]/g, '');

        if (!id) {
            if (Platform.OS === 'web') {
                alert('Erro: Dados do contato não carregados corretamente.');
            } else {
                Alert.alert('Erro', 'Dados do contato não carregados corretamente.');
            }
            return;
        }

        if (nome.trim() === '' || telefone.trim() === '') {
            if (Platform.OS === 'web') {
                alert('Por favor, preencha todos os campos.'); // Alerta para web
            } else {
                Alert.alert('Erro', 'Por favor, preencha todos os campos.'); // Alerta para mobile
            }
            return;
        }

        if (telefoneNumerico.length !== 11) {
            if (Platform.OS === 'web') {
                alert('Formato de telefone inválido.'); // Alerta para web
            } else {
                Alert.alert('Erro', 'Formato de telefone inválido.'); // Alerta para mobile
            }
            return;
        }

        const contatoRef = ref(db, `/ContatoItem/${id}`);
        update(contatoRef, { nome, telefone })
            .then(() => {
                if (Platform.OS === 'web') {
                    alert('Contato atualizado com sucesso!'); // Alerta para web
                } else {
                    Alert.alert('Sucesso', 'Contato atualizado com sucesso!'); // Alerta para mobile
                }
                this.props.navigation.navigate('Listagem');
            })
            .catch(error => {
                Alert.alert('Erro', `Erro ao atualizar contato: ${error.message}`);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Editar Contato</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nome:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o nome..."
                        placeholderTextColor="#999"
                        onChangeText={nome => this.setState({ nome })}
                        value={this.state.nome}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Telefone:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="(DDD) 00000-0000"
                        placeholderTextColor="#999"
                        onChangeText={this.handleTelefoneChange}
                        value={this.state.telefone}
                        keyboardType="phone-pad"
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={this.atualizarContato}>
                    <Text style={styles.buttonText}>Salvar Alterações</Text>
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

export default EditContato;