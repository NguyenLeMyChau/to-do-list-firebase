import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Alert, TouchableOpacity } from 'react-native';
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';
import TextInputForm from '../components/input/TextInputForm';
import ButtonForm from '../components/button/ButtonForm';
import TouchableOpacityForm from '../components/button/TouchableOpacityForm';
import { FIREBASE_AUTH } from '../config/firebaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';

export default function SignUp({ navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Xử lý đăng ký
    const handleSignUp = async () => {
        try {
            const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
            if (response) {
                // Cập nhật username cho người dùng
                await updateProfile(FIREBASE_AUTH.currentUser, {
                    displayName: username
                });

                await sendEmailVerification(FIREBASE_AUTH.currentUser);

                Alert.alert('Success', 'Đăng ký thành công');
            }

        } catch (error) {
            Alert.alert('Error', `Đăng ký thất bại: ${error.message}`);
            console.log(error.message);
        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Sign Up</Text>

            <TextInputForm
                Icon={AntDesign}
                nameIcon={'user'}
                placeholder={'Username'}
                value={username}
                onChangeText={setUsername}
            />

            <TextInputForm
                Icon={Fontisto}
                nameIcon={'email'}
                placeholder={'Email'}
                value={email}
                onChangeText={setEmail}
            />

            <TextInputForm
                Icon={AntDesign}
                nameIcon={'lock'}
                placeholder={'Password'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />

            <ButtonForm TextValue={'Sign Up'} onPress={handleSignUp} />

            <TouchableOpacityForm
                TextBegin={"Already have an account?"}
                TextValue={'Sign In'}
                onPress={() => navigation.navigate('SignIn')}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 24,
        fontWeight: 'medium',
        color: '#36648B'
    },
    buttonSignIn: {
        width: '100%',
        padding: 12,
        backgroundColor: '#36648B',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16
    },
    forgotPass: {
        alignSelf: 'flex-end',
        marginBottom: 16
    }
});