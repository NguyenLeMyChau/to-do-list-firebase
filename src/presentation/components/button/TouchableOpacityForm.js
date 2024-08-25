import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default function TouchableOpacityForm({ TextBegin, TextValue, onPress }) {

    return (
        <View style={{ flexDirection: 'row' }}>
            <Text>{TextBegin}</Text>
            <TouchableOpacity style={styles.TouchableOpacityForm} onPress={onPress}>
                <Text style={{ color: '#36648B', left: 5 }}>{TextValue}</Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    TouchableOpacityForm: {
        alignSelf: 'flex-end',
        marginBottom: 16
    },
});