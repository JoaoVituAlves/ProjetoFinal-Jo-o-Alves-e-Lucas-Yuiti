import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const Sobre = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.headerText, styles.headerTitle]}>Sobre o Aplicativo</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.sectionText}>
            Este aplicativo funciona como uma agenda de contatos. Nas diferentes abas, os usuários encontrarão o seguinte:
          </Text>
          <Text style={styles.sectionText}>
            - <TouchableOpacity onPress={() => navigation.navigate('Listagem')}><Text style={styles.link}>Listagem</Text></TouchableOpacity>: Tela de listagem de contatos, com uma lista de todos os contatos cadastrados, um botão para ir a aba de edição e outro para excluir o contato, se desejar.
          </Text>
          <Text style={styles.sectionText}>
            - <TouchableOpacity onPress={() => navigation.navigate('Adicionar')}><Text style={styles.link}>Adicionar</Text></TouchableOpacity>: Tela para adicionar um novo contato, informando o nome e o telefone a ser cadastrado.
          </Text>
          <Text style={styles.sectionText}>
            - <TouchableOpacity onPress={() => navigation.navigate('Editar')}><Text style={styles.link}>Editar</Text></TouchableOpacity>: Tela para editar um contato existente, informando o nome e o telefone a ser alterado.
          </Text>
          <Text style={styles.sectionText}>
            Nosso aplicativo de Agenda de Contatos oferece uma solução completa e conveniente para organizar e gerenciar seus contatos de forma eficaz. Com uma interface intuitiva e recursos poderosos, nosso aplicativo torna mais fácil do que nunca manter suas informações de contato atualizadas e acessíveis a qualquer momento e em qualquer lugar.
          </Text>
        </View>
        <View style={styles.footer}>
          <Text style={[styles.footerText]}>
            &copy; 2024 Agenda de Contatos
          </Text>
          <Text style={[styles.footerText]}>
            Desenvolvido por João Alves & Lucas Yuiti
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    backgroundColor: 'black',
    alignItems: 'center',
    paddingBottom: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
  },
  headerTitle: {
    padding: 10,
    marginTop: 10,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    color: '#007bff',
    fontSize: 20,
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'justify'
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  footer: {
    backgroundColor: 'black',
    alignItems: 'center',
    paddingTop: 20,
    padding: 20 
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Sobre;
