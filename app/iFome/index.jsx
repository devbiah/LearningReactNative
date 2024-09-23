import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './Main';
import CartScreen from './Cart';

const Stack = createNativeStackNavigator();

function iFome() {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator>
                <Stack.Screen name="iFomeScreen" component={MainScreen} />
                <Stack.Screen name="Cart" component={CartScreen} />
            </Stack.Navigator>

        </NavigationContainer>
    );
}

export default iFome;