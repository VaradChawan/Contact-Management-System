import React from "react";
import { Link } from "react-router-dom";
function SideBar() {
  
  
   const logoutButton=()=>{
     localStorage.removeItem("user")
     navigate('/login')
   }
  
  
  return (
    <div className="sidebar d-flex flex-column justify-content-space-between bg-dark text-white p-4 vh-100">
      <div className="vh-50">
        <Link className="d-flex align-items-center" to="/" />
        <span className="fs-4">Username</span>

        <hr className="text-secondary" />
        <ul className="nav nav-pills flex-column ">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Contact Details
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li> */}
        </ul>


     

      </div>

      <div className="d-flex flex-column ">
          <ul className="nav flex-column ">
            
            <li className="nav-item">
              <Link className="btn btn-danger" onClick={logoutButton}>Logout</Link>
            </li>
            
          </ul>
      </div>
  

    </div>
  );
}

export default SideBar;
