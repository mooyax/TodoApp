import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from './SettingsScreen';


const HomeStack = createStackNavigator();

const SettingsStackScreen=()=> {
    return (
      <HomeStack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: 'tomato' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      >
        <HomeStack.Screen
          name="Setting"
          component={SettingsScreen}
          options={{ 
            title: 'Info Page',
          }}/>
      </HomeStack.Navigator>
    );
  }

 export default SettingsStackScreen;