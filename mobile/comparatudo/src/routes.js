import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';

import Objeto from './pages/Objeto'
import Criterio from './pages/Criterio'
import Comparacao from './pages/Comparacao'
import { createBottomTabNavigator } from 'react-navigation-tabs';


export default createAppContainer(
  createBottomTabNavigator({
    Objeto: {
      screen: Objeto,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor })=>{
          return <Icon name="cube" size={25} color={tintColor} />;
        }
      }
    },
    Criterio: {
      screen: Criterio,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor })=>{
          return <Icon name="tasks" size={25} color={tintColor} />;
        }
      }
    },
    Comparacao: {
      screen: Comparacao,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor })=>{
          return <Icon name="window-close" size={25} color={tintColor} />;
        }
      }
    }
  }, {
    tabBarOptions: {
      activeBackgroundColor: '#031822',
      activeTintColor: '#fff',
      labelStyle: {
        fontSize: 14,
      },
      style: {
        backgroundColor: '#062839',
      },
    },
  })
);