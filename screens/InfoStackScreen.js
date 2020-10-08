import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import InfoScreen from './InfoScreen';
import { withTheme } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeStack = createStackNavigator();

const InfoStackScreen=({navigation})=> {
    return (
        <HomeStack.Navigator
            initialRouteName="Info"
            screenOptions={{
                headerStyle: { backgroundColor: '#42f44b' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' }
            }}
        >
        <HomeStack.Screen
          name="Info"
          component={InfoScreen}
          options={{ 
            title: 'Info Page' ,
            headerRight:() => (
              <Icon name="settings" 
                onPress={() => navigation.navigate('Setting')}
                size={34}
                title="Info"
                color="gray"
                style={{marginRight:10}}
              />
            )
          }}/>
      </HomeStack.Navigator>
    );
  }
  
  export default InfoStackScreen;