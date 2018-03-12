import React, { Component } from "react";
import Login from '../views/login';
import SignUp from '../views/signup';
import SignUp2 from '../views/signup2';
import { StackNavigator } from "react-navigation";


const SignUpRouter = StackNavigator (

  {
    Login: { screen: Login },
    SignUp: { screen: SignUp },
    SignUp2: { screen: SignUp2 },
  },
  {
    headerMode: 'none',
  }
);

export default SignUpRouter;
