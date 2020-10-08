
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TodoScreen from './TodoScreen';

import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeStack = createStackNavigator();

const HomeStackScreen= ({navigation})=>{
    return (
      <HomeStack.Navigator
          initialRouteName="Todoapp"
          screenOptions={{
            headerStyle: { backgroundColor: 'tomato' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' }
          }}
          >
          <HomeStack.Screen 
            name="Todoapp" 
            component={TodoScreen} 
            options={{
              title:"Todo App",
              headerRight:() => (
                <Icon name="settings" 
                  onPress={() => navigation.navigate('Setting')}
                  size={34}
                  title="Info"
                  color="gray"
                  style={{marginRight:10}}
                />
              )
            }}
          />
        </HomeStack.Navigator>
    )
  }
  
  export default HomeStackScreen;