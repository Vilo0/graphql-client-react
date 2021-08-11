import React, { useState, useContext, Fragment } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { auth } from "firebase";
import { AuthContext } from "../context/authContext";

const Nav = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  let history = useHistory();

  const { user } = state;

  const logout = () => {
    auth().signOut();
    dispatch({
      type: "LOGGED_IN_USER",
      payload: null,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    history.push({
      pathname: '/posts',
      state: { search }
    });
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
      <Link className="navbar-brand" to="/">
        Navbar
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toogle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/users" activeClassName="active">
              Users
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/posts" activeClassName="active">
              Posts
            </NavLink>
          </li>

          {user && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile" activeClassName="active">
                {user && user.email.split("@")[0]}
              </NavLink>
            </li>
          )}

          {!user && (
            <Fragment>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </Fragment>
          )}
          {user && (
            <li className="nav-item">
              <a onClick={logout} href="/login" className="nav-item nav-link">
                Logout
              </a>
            </li>
          )}
        </ul>
        <form onSubmit={handleSearch} className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => setSearch(e.target.value)}
            name="search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Nav;
