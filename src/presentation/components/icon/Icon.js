import React from 'react';
import { StyleSheet } from 'react-native';

export default function Icon({ Icon, nameIcon, onClick }) {

    return (
        <Icon name={nameIcon} size={24} color="black" onClick={onClick} style={styles.styleIcon} />
    );
}

const styles = StyleSheet.create({
    styleIcon: {
        width: '100%',
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#C4C4C4',
        borderRadius: 4,
        paddingLeft: 20
    }
});