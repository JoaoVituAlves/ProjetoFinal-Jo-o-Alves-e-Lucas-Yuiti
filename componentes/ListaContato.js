import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, Platform } from "react-native";
import { Feather } from '@expo/vector-icons';
import { ref, onValue, remove } from 'firebase/database';
import { db } from "../config/config";

class ListaContato extends React.Component {
  state = {
    contatos: []
  };

  componentDidMount() {
    const contatosRef = ref(db, '/ContatoItem');
    onValue(contatosRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        const contatosArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
        // Ordena os contatos em ordem alfabética pelo nome
        contatosArray.sort((a, b) => a.nome.localeCompare(b.nome));
        this.setState({ contatos: contatosArray });
      } else {
        this.setState({ contatos: [] });
      }
    });
  }

  confirmDeleteContato = (id, nome) => {
    const message = `Tem certeza que deseja excluir o contato ${nome}?`;

    if (Platform.OS === 'web') {
      if (window.confirm(message)) {
        this.handleDeleteContato(id);
        alert(`${nome} foi excluído com sucesso!`);
      }
    } else {
      Alert.alert(
        "Confirmar Exclusão",
        message,
        [
          {
            text: "Cancelar",
            style: "cancel"
          },
          {
            text: "Excluir",
            onPress: () => this.handleDeleteContato(id),
            style: "destructive"
          }
        ]
      );
    }
  };

  handleDeleteContato = (id) => {
    const contatoRef = ref(db, `/ContatoItem/${id}`);
    remove(contatoRef)
      .then(() => {
        this.setState(prevState => ({
          contatos: prevState.contatos.filter(contato => contato.id !== id)
        }));
      })
      .catch(error => {
        console.error(error);
      });
  };

  handleEditContato = (contato) => {
    this.props.navigation.navigate('Editar', { contato });
  };

  renderContato = ({ item }) => (
    <View style={styles.card}>
    <View style={styles.cardContent}>
      <View style={styles.contatoInfo}>
        <Feather name="user" size={30} color="black" style={styles.contatoIcon} />
        <View style={styles.textInfo}>
          <Text style={styles.contatoNome}>{item.nome}</Text>
          <Text style={styles.contatoTelefone}>{item.telefone}</Text>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <View>
          <Feather onPress={() => this.handleEditContato(item)} name="edit" size={20} color="#4CAF50" style={styles.icon} />
        </View>
        <View>
          <Feather onPress={() => this.confirmDeleteContato(item.id, item.nome)} name="trash-2" size={20} color="#F44336" style={styles.icon} />
        </View>
      </View>
    </View>
  </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Contatos</Text>
        {this.state.contatos.length > 0 ? (
          <FlatList
            data={this.state.contatos}
            renderItem={this.renderContato}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.lista}
          />
        ) : (
          <Text style={styles.noContactsText}>Não há contatos cadastrados!</Text>
        )}
        <TouchableOpacity style={styles.addButton} onPress={() => this.props.navigation.navigate('Adicionar')}>
          <Text style={styles.addButtonText}>Adicionar Novo Contato</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    padding: 20,
  },
  lista: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contatoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contatoIcon: {
    marginRight: 10,
  },
  textInfo: {
    flex: 1,
  },
  contatoNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  contatoTelefone: {
    fontSize: 16,
    color: '#555555',
    marginTop: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    marginLeft: 10
  },
  icon: {
    marginHorizontal: 5,
  },
  addButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
    width: '100%',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  noContactsText: {
    fontSize: 18,
    color: '#333',
    alignSelf: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    alignSelf: 'center',
  },
});

export default ListaContato;