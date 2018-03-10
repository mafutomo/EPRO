import React from 'react';
import { DrawerNavigator} from 'react-navigation';
import Home from '../views/home';
import Workout from '../views/workout';
import TopNav from '../components/topnav';

const ExampleDrawer = DrawerNavigator(
  {
    Home : {

      screen : Home,
    },
    Workout :{

      screen : Workout,
    },
  },
  {
    drawerPosition: 'left',
    contentComponent: (props) => <TopNav {...props} />,
    drawerWidth: 300,
  }
)

export default ExampleDrawer;
