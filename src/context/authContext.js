import React, { useReducer, useEffect, createContext } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";

// reducer function
const firebaseReducer = (state, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

// state
const initialState = {
  user: null,
};

// create context
const AuthContext = createContext();

// context provider
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(firebaseReducer, initialState);
  let history = useHistory();

  useEffect(() => {
    history.listen((location) => {
      console.log(`You changed the page to: ${location.pathname}`)
    })
  }, [history])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: "LOGGED_IN_USER",
          payload: { email: user.email, token: idTokenResult.token },
        });
      } else {
        dispatch({
          type: "LOGGED_IN_USER",
          payload: null,
        });
      }
    });
    // cleanup
    return () => unsubscribe();
  }, []);

  const value = { state, dispatch };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
