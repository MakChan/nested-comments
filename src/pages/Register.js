import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Label, Input} from "@rebass/forms";
import { Box, Button } from "rebass";
import { Form, Field } from "react-final-form";

import http from "../utils/http";
import { useAuthContext } from "../utils/authContext";
import { required } from "../utils/validations";

const Register = () => {
  const history = useHistory();
  const { setUser } = useAuthContext();

  const onSubmit = async formData => {
    const data = await http("users/register", "POST", formData);
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
