import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../screen/SignIn';
import SignUp from '../screen/SignUp';
import ToDoList from '../screen/ToDoList';
import Header from '../components/header/Header';


const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SignIn"
                screenOptions={{
                    headerShown: false
                }}>

                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Header" component={Header} />
                <Stack.Screen name="TodoList" component={ToDoList} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;