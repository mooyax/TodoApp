

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { useSelector} from "react-redux";
import HomeStackScreen from './HomeStackScreen';
import InfoStackScreen from './InfoStackScreen';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const MainTabScreen=()=>{

  const  todos = useSelector(state => state.todos.todos);

  const uncheckTodos = todos.filter((item)=>item.done == false);

    return (
      <Tab.Navigator
        initialRouteName="HomeStack"
        tabBarOptions={{
          activeTintColor: 'tomato',
        }}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStackScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="home"
                color={color}
                size={size}
              />
            ),
            tabBarBadge: uncheckTodos.length, 
          }}  />
        <Tab.Screen
          name="InfoStack"
          component={InfoStackScreen}
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

export default MainTabScreen;