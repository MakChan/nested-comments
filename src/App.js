import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Box, Card } from "rebass";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Post from "./pages/Post";
import CreatePost from "./pages/CreatePost"

import NoMatch from "./components/NoMatch";
import Header from "./components/Header";

import { useAuthContext } from "./utils/authContext";

const Container = props => (
  <Box
    {...props}
    sx={{
      maxWidth: "1024px",
      mx: "auto",
      px: 3
    }}
  />
);

function App() {
  return (
    <Container>
      <Switch>
        <AuthRoute path="/login" exact component={Login} title="Login" />
        <AuthRoute
          path="/register"
          exact
          component={Register}
          title="Register"
        />

        <GuardedRoute path="/" exact component={Home} />
        <GuardedRoute path="/post/create" exact component={CreatePost} />
        <GuardedRoute path="/post/:postId" exact component={Post} />
        
        <Route component={NoMatch} />
      </Switch>
    </Container>
  );
}

const AuthRoute = ({ component: Component, title, ...rest }) => {
  const { userState } = useAuthContext();

  return (
    <Route
      {...rest}
      render={props =>
        userState.user ? (
          <Redirect to={{ pathname: "/" }} />
        ) : (
          <Card width={400} p={4} mx="auto" mt={5}>
            <h2>{title}</h2>
            <Component {...props} />
          </Card>
        )
      }
    />
  );
};

const GuardedRoute = ({ component: Component, ...rest }) => {
  const { userState, logOut } = useAuthContext();

  if (!userState.loaded) return "";
  return (
    <Route
      {...rest}
      render={props =>
        !userState.user ? (
          <Redirect to={{ pathname: "/login" }} />
        ) : (
          <>
            <Header user={userState.user} logOut={logOut} />
            <main>
              <Component {...props} />
            </main>
          </>
        )
      }
    />
  );
};

export default App;
