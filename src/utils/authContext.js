import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

const initialState = { user: undefined, loaded: false };

export const AuthContext = React.createContext({
  userState: initialState,
  setUser: () => {},
  logOut: () => {}
});

export const UserProvider = props => {
  const [userState, setUserState] = useState(initialState);

  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("x-token");

    if (token && token !== "undefined") {
      console.log("token ==>", token); // TODO: remove this
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("user ==>", user); // TODO: remove this
      setUserState({
        loaded: true,
        user
      });
      // console.log('userState ==>', userState); // TODO: remove this
    } else
      setUserState({
        loaded: true
      });
    // console.log("userState ==>", userState); // TODO: remove this
  }, []);

  const setUser = data => {
    localStorage.setItem("x-token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUserState({ user: data.user, loaded: true });
  };

  const logOut = () => {
    localStorage.removeItem("x-token");
    setUserState({ user: undefined });
    history.push("/login");
  };

  console.log("userState ==>", userState); // TODO: remove this
  return (
    <AuthContext.Provider
      value={{
        userState,
        setUser,
        logOut
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
