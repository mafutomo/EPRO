import React from 'react';
import { DrawerNavigator} from 'react-navigation';
import Home from '../views/home';
import Workout from '../views/workout';

const ExampleDrawer = DrawerNavigator(
  {
    Home : {
      path: '/',
      screen : Home,
    },
    Workout :{
      path: '/workout',
      screen : Workout,
    },
  },
  {
    initialRouteName: 'Home',
    drawerPosition: 'left'
  }
)

export default ExampleDrawer;
