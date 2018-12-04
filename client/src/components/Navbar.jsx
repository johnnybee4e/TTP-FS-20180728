import React from "react";
import { Link }  from "react-router-dom";
const isLoggedIn = false;

const Navbar = () => (
  <div>
    <h1>Stock Up</h1>
    <nav>
      {isLoggedIn ? (
        <div>
        {/* this button will eventually be a link */}
          <button type="button" >Home</button>
          <a href="#">Logout</a>
        </div>
      ) : (
        <div>
          {/* this button will eventually be a link */}
          <button type="button" >Login</button>
          {/* this button will eventually be a link */}
          <button type="button" >Sign up</button>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

export default Navbar;