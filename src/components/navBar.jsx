import React, { useReducer } from 'react';
import { NavLink, Link } from 'react-router-dom';

const NavBar = ( { user } ) => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Vidly</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to="/movies">Movies</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/customers">Customers</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/rentals">Rentals</NavLink>
                    </li>
                   {!user && (
                   <React.Fragment>
                        <NavLink className="nav-link nav-item" to="/login">Login</NavLink>
                        <NavLink className="nav-link nav-item" to="/register">Register</NavLink>
                    </React.Fragment>)
                    }
                    {user && (
                    <React.Fragment>
                            <NavLink className="nav-link nav-item" to="/profile">{user.name}</NavLink>
                            <NavLink className="nav-link nav-item" to="/logout">Logout</NavLink>
                    </React.Fragment>
                    )}
                    
                </ul>
                </div>
            </div>
        </nav>
     );
}
 
export default NavBar;