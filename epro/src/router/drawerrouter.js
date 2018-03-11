import React, { Component } from 'react';
import { DrawerNavigator} from 'react-navigation';
import Login from '../views/login';
import Home from '../views/home';
import SideBar from '../components/sidebar';
import TabNavigator from './tabrouter'

const DrawerRouter = DrawerNavigator(
  {
    Home : { screen : TabNavigator },
    Logout : { screen : Login},
  },
  {
    initialRouteName: 'Home',
    contentComponent: props => <SideBar {...props} />
  }
)

export default DrawerRouter;
