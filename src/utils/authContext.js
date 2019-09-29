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
      const user = JSON.parse(localStorage.getItem("user"));
      setUserState({
        loaded: true,
        user
      });
    } else
      setUserState({
        loaded: true
      });
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
