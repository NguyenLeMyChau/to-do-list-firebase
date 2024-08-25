import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Alert, TouchableOpacity } from 'react-native';
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ButtonForm from '../components/button/ButtonForm';
import TouchableOpacityForm from '../components/button/TouchableOpacityForm';
import TextInputForm from '../components/input/TextInputForm';

import { FIREBASE_AUTH } from '../config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';


export default function SignIn({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Xử lý đăng nhập với email và password
    const handleSignIn = async () => {
        try {
            const response = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
            if (response) {
                Alert.alert('Success', `Đăng nhập thành công`);
                navigation.navigate('TodoList');
            }
        } catch (error) {
            Alert.alert('Error', 'Đăng nhập thất bại: ' + error.message);
            console.error('Error signing in: ', error.message);
        }
    }

    const handleSignInWithFacebook = async () => {
        console.log('Sign in with Facebook');
    };

    // Xử lý đăng nhập với Google
    const handleSignInWithGoogle = async () => {
        console.log('Sign in with Google');
    }
    return (
        <View style={styles.container}>

            <Text style={styles.title}>Sign In</Text>

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

            <TouchableOpacity style={styles.forgotPass}>
                <Text style={{ color: '#36648B' }}>Forgot password</Text>
            </TouchableOpacity>

            <ButtonForm TextValue={'Đăng Nhập'} onPress={handleSignIn} />

            <TouchableOpacityForm
                TextBegin={"Don't have an account?"}
                TextValue={'Sign up'}
                onPress={() => navigation.navigate('SignUp')}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <AntDesign name="facebook-square" size={40} color="blue" style={{ marginRight: 15 }} onPress={handleSignInWithFacebook} />
                <MaterialCommunityIcons name="gmail" size={50} color="red" onPress={handleSignInWithGoogle} />
            </View>



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
    forgotPass: {
        alignSelf: 'flex-end',
        marginBottom: 16
    }

});