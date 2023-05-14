import {Navigate} from 'react-router-dom';
import React from "react";

const ProtectedRoute = ({ children, ...props }) => {
  if (!props.loggedIn) return ( <Navigate to="/" replace /> )
  else return children;
};

export default ProtectedRoute;
