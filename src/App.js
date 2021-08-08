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
  const baseURL = process.env.REACT_APP_BASE_URL;

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
        <Route exact path={`${baseURL}/`} component={Home} />
        <Route exact path={`${baseURL}/users`} component={Users} />
        <Route exact path={`${baseURL}/posts`} component={Posts} />
        <PublicRoute exact path={`${baseURL}/register`} component={Register} />
        <PublicRoute exact path={`${baseURL}/login`} component={Login} />
        <Route
          exact
          path={`${baseURL}/complete-registration`}
          component={CompleteRegistration}
        />
        <Route exact path={`${baseURL}/password/forgot`} component={PasswordForgot} />
        <PrivateRoute
          exact
          path={`${baseURL}/password/update`}
          component={PasswordUpdate}
        />
        <PrivateRoute exact path={`${baseURL}/profile`} component={Profile} />
        <PrivateRoute exact path={`${baseURL}/post/create`} component={Post} />
        <PrivateRoute exact path={`${baseURL}/post/:idPost`} component={SinglePost} />
        <Route exact path={`${baseURL}/user/:username`} component={SingleUser} />
      </Switch>
    </ApolloProvider>
  );
};

export default App;
