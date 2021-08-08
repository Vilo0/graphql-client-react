import React, { useContext } from "react";
import ApolloClient from "apollo-boost";
import { Switch, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { AuthContext } from "./context/authContext";
import { ToastContainer } from "react-toastify";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Register from "./pages/auth/Register";
import PasswordUpdate from "./pages/auth/PasswordUpdate";
import PasswordForgot from "./pages/auth/PasswordForgot";
import Profile from "./pages/auth/Profile";
import Login from "./pages/auth/Login";
import CompleteRegistration from "./pages/auth/CompleteRegistration";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Post from "./pages/post/Post";
import SingleUser from "./pages/SingleUser";
import Posts from "./pages/post/Posts";
import SinglePost from "./pages/post/SinglePost";

const App = () => {
  const { state } = useContext(AuthContext);
  const { user } = state;

  const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
    request: (operation) => {
      operation.setContext({
        headers: {
          authtoken: user ? user.token : "",
        },
      });
    },
  });

  return (
    <ApolloProvider client={client}>
      <Nav />
      <ToastContainer />
      <Switch>
        <Route exact path={`${process.env.REACT_APP_BASE_URL}/`} component={Home} />
        <Route exact path={`${process.env.REACT_APP_BASE_URL}/users`} component={Users} />
        <Route exact path={`${process.env.REACT_APP_BASE_URL}/posts`} component={Posts} />
        <PublicRoute exact path={`${process.env.REACT_APP_BASE_URL}/register`} component={Register} />
        <PublicRoute exact path={`${process.env.REACT_APP_BASE_URL}/login`} component={Login} />
        <Route
          exact
          path={`${process.env.REACT_APP_BASE_URL}/complete-registration`}
          component={CompleteRegistration}
        />
        <Route exact path={`${process.env.REACT_APP_BASE_URL}/password/forgot`} component={PasswordForgot} />
        <PrivateRoute
          exact
          path={`${process.env.REACT_APP_BASE_URL}/password/update`}
          component={PasswordUpdate}
        />
        <PrivateRoute exact path={`${process.env.REACT_APP_BASE_URL}/profile`} component={Profile} />
        <PrivateRoute exact path={`${process.env.REACT_APP_BASE_URL}/post/create`} component={Post} />
        <PrivateRoute exact path={`${process.env.REACT_APP_BASE_URL}/post/:idPost`} component={SinglePost} />
        <Route exact path={`${process.env.REACT_APP_BASE_URL}/user/:username`} component={SingleUser} />
      </Switch>
    </ApolloProvider>
  );
};

export default App;
