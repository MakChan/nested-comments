import React from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import { Label, Input, Select, Textarea, Radio, Checkbox } from "@rebass/forms";
import { Box, Flex, Heading, Text, Card, Button } from "rebass";
import { Form, Field } from "react-final-form";
import { useAuthContext } from "../utils/authContext";
import http from "../utils/http";

const required = value => (value ? undefined : "Required");

const Login = () => {
  const history = useHistory();
  const { setUser } = useAuthContext();

  const onSubmit = async formData => {
    console.log("formData ==>", formData); // TODO: remove this
    const data = await http("users/login", "POST", formData);
    console.log("data ==>", data); // TODO: remove this
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
