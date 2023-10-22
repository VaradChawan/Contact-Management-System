import React from 'react'

import Home from './pages/Home';
import {Routes,Route,Navigate} from 'react-router-dom';
import Login from './pages/Login';
import About from './pages/About';
import Register from './pages/Register';
function App() {
  

 return(
  <>
  <Routes>
      <Route path="/" element={
        
       <ProtectedRoutes>
            <Home/>
            </ProtectedRoutes>
    }
    />
      <Route path="/about" element={
      
        <About/>
        
        
        }/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
  </Routes>
  </>

 );
}
export function ProtectedRoutes(props){
  if(localStorage.getItem("user")){
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }

}


export default App
