import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'; 
import { Appearance } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react'

import { persistor } from "./store";
import RootStackScreen from '../screens/RootStackScreen';


const NavigatorContainerComponent = () => {
    const dispatch = useDispatch(); 

    let themeName = useSelector(state => state.todos.currentTheme);

    themeName = themeName=='auto'?Appearance.getColorScheme():themeName;


    

    return (
        <NavigationContainer theme={themeName=='dark' ? DarkTheme : DefaultTheme}>
            <PersistGate loading={null} persistor={persistor}>
              <RootStackScreen/>
            </PersistGate>
      </NavigationContainer>
    );

}

export default NavigatorContainerComponent;