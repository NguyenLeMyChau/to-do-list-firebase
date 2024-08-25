import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function ButtonForm({ TextValue, onPress }) {

    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonForm}>
            <Text style={styles.textButton}>{TextValue}</Text>
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    buttonForm: {
        width: '100%',
        padding: 12,
        backgroundColor: '#36648B',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16
    },

    textButton: {
        color: 'white'
    }
});