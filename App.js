import React from 'react';
import TodoScreen from './src/TodoScreen';
import InfoScreen from './src/InfoScreen';
import SettingsScreen from './src/SettingsScreen';
import { Provider } from "react-redux";
import store, { persistor } from "./src/store";
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

function HomeStack({navigation}) {
  return (
    <Stack.Navigator
        initialRouteName="Todoapp"
        screenOptions={{
          headerStyle: { backgroundColor: 'tomato' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}>
        <Stack.Screen 
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
      </Stack.Navigator>
  )
}

function InfoStack({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="Info"
      screenOptions={{
        headerStyle: { backgroundColor: '#42f44b' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      }}>
      <Stack.Screen
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
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'tomato' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      }}
    >
      <Stack.Screen
        name="Setting"
        component={SettingsScreen}
        options={{ 
          title: 'Info Page',
        }}/>
    </Stack.Navigator>
  );
}

class MainTabScreen extends React.Component {

  render(){
    return (
      <Tab.Navigator
        initialRouteName="HomeStack"
        tabBarOptions={{
        activeTintColor: 'tomato',
      }}>
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="home"
                color={color}
                size={size}
              />
            ),
            tabBarBadge: 3 
          }}  />
        <Tab.Screen
          name="InfoStack"
          component={InfoStack}
          options={{
            tabBarLabel: 'Info',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="settings"
                color={color}
                size={size}
              />
            ),
          }} />
        </Tab.Navigator>
    );
  }
}

function RootStackScreen() {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Main"
        component={MainTabScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="Setting" component={SettingsScreen} />
    </RootStack.Navigator>
  );
}

export default class App extends React.Component {



  render() {
    return (
      <NavigationContainer>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <RootStackScreen/>
          </PersistGate>
        </Provider>
      </NavigationContainer>
    )
  }
}