import React, { Component } from "react";
import Login from '../views/login';
import SignUp from '../views/signup';
import { StackNavigator } from "react-navigation";


const SignUpRouter = StackNavigator (

  {
    Login: { screen: Login },
    SignUp: { screen: SignUp },

  },
  {
    headerMode: 'none',
  }
);

export default SignUpRouter;
