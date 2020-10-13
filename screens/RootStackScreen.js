

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from './SettingsScreen';
import StartScreen from './StartScreen';
import MainTabScreen from './MainTabScreen';


const RootStack = createStackNavigator();

const RootStackScreen= ()=> {
    //const theme=useSelector(state => state.todos.currentTheme);

    
    return (
      <RootStack.Navigator 
        mode="modal"
        initialRouteName="Starting"
      >
        <RootStack.Screen
          name="Main"
          component={MainTabScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen name="Setting" component={SettingsScreen}/>
        <RootStack.Screen name="Starting" component={StartScreen}/>
      </RootStack.Navigator>
    );
  }

  export default RootStackScreen;