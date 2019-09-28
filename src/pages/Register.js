import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Label, Input, Select, Textarea, Radio, Checkbox } from "@rebass/forms";
import { Box, Flex, Heading, Text, Card, Button } from "rebass";
import { useAuthContext } from "../utils/authContext";
import { Form, Field } from "react-final-form";

import http from "../utils/http";

const required = value => (value ? undefined : "Required");

const Register = () => {
  const history = useHistory();
  const { setUser } = useAuthContext();

  const onSubmit = async formData => {
    console.log("props ==>", formData); // TODO: remove this
    const data = await http("users/register", "POST", formData);
    console.log("data ==>", data); // TODO: remove this
    setUser(data);

    history.push("/");
  };
  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field name="name" validate={required}>
            {({ input, meta }) => (
              <Box mb={3}>
                <Label htmlFor="name">Name</Label>
                <Input {...input} id="name" type="text" />
                {meta.error && meta.touched && (
                  <Box color="red">{meta.error}</Box>
                )}
              </Box>
            )}
          </Field>

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
              Register
            </Button>
            <Link to="/login">Login</Link>
          </Box>
        </form>
      )}
    </Form>
  );
};

export default Register;
