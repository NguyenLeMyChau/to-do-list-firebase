import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FIREBASE_AUTH } from '../../config/firebaseConfig';
import { signOut } from 'firebase/auth';


export default function Header({ username, navigation }) {
    const auth = FIREBASE_AUTH;

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            alert('Signed out successfully!');
            navigation.navigate('SignIn');
        } catch (error) {
            console.error('Error signing out: ', error);
            alert('Error signing out: ' + error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>ToDoList</Text>
            <Text style={styles.user}>Hi, {username}</Text>

            <TouchableOpacity onPress={handleSignOut} style={styles.buttonSignOut}>
                <Text style={styles.signOut}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 100,
        backgroundColor: '#36648B',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingLeft: 30,
        marginTop: 0,
        marginBottom: 20
    },

    title: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'medium'
    },

    user: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'medium'
    },

    buttonSignOut: {
        width: 100,
        height: 30,
        backgroundColor: 'red',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: -25,
    },

    signOut: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'medium',
        backgroundColor: 'red',
    }

});
