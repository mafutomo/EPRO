import React, { Component } from "react";
import Login from '../views/login';
import SignUp from '../views/signup';
import { StackNavigator } from "react-navigation";


const SignUpRouter = StackNavigator (

  {
    Login: { screen: props => <Login {...props} /> },
    SignUp: { screen: props => <SignUp {...props} /> },

  },
  {
    initialRouteName: "Login"
  }
);

export default SignUpRouter;
