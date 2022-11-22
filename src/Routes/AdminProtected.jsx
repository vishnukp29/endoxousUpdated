import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";


const AdminProtected = ({  children }) => {
//check if user is loggin
const dispatch = useDispatch;
 const {isAuthenticatedAdmin} = useSelector(state => state?.user)


 if (!isAuthenticatedAdmin) {

 return <Navigate to="/" replace />;
 }
 return children;
};
export default AdminProtected;