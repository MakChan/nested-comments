import React from "react";
import { Link, useHistory } from "react-router-dom";

import { Label, Input } from "@rebass/forms";
import { Box, Button } from "rebass";
import { Form, Field } from "react-final-form";
import { useAuthContext } from "../utils/authContext";
import http from "../utils/http";
import { required } from "../utils/validations";

const Login = () => {
  const history = useHistory();
  const { setUser } = useAuthContext();

  const onSubmit = async formData => {
    const data = await http("users/login", "POST", formData);
    setUser(data);

    history.push("/");
  };
  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field name="username" validate={required}>
            {({ input, meta }) => (
              <Box mb={3}>
                <Label htmlFor="username">Username</Label>
                <Input {...input} id="username" type="text" />
                {meta.error && meta.touched && (
                  <Box color="red">{meta.error}</Box>
                )}
              </Box>
            )}
          </Field>

          <Field name="password" validate={required}>
            {({ input, meta }) => (
              <Box mb={3}>
                <Label htmlFor="password">Password</Label>
                <Input {...input} id="password" type="password" />
                {meta.error && meta.touched && (
                  <Box color="red">{meta.error}</Box>
                )}
              </Box>
            )}
          </Field>
          <Box ml="auto">
            <Button type="submit" variant="secondary" mr={3}>
              Login
            </Button>
            <Link to="/register">Register</Link>
          </Box>
        </form>
      )}
    </Form>
  );
};

export default Login;
