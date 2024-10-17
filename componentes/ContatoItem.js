import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ContatoItem = ({ contato, onPress }) => {
    return (
        <TouchableOpacity onPress={() => onPress(contato)}>
            <View style={styles.container}>
                <Text style={styles.nome}>{contato.nome}</Text>
                <Text style={styles.telefone}>{contato.telefone}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    nome: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    telefone: {
        fontSize: 14,
        color: '#888',
    },
});

export default ContatoItem;