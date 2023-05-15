import {Navigate} from 'react-router-dom';
import React from "react";
import mainApi from "../../utils/MainApi";
import {printErrorToConsole} from "../../utils/const";

const ProtectedRoute = ({ children, ...props }) => {
  let loggedIn = localStorage.getItem('loggedIn');

  if (loggedIn) return children
  else return ( <Navigate to="/" replace /> );
};

export default ProtectedRoute;
