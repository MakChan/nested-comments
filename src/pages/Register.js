import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Label, Input } from "@rebass/forms";
import { Box } from "rebass";
import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";

import http from "../utils/http";
import { useAuthContext } from "../utils/authContext";
import { required } from "../utils/validations";

import Button from "../components/LoadingButton";

const Register = () => {
  const history = useHistory();
  const { setUser } = useAuthContext();

  const onSubmit = async formData => {
    try {
      const data = await http("users/register", "POST", formData);
      setUser(data);
    } catch (e) {
      return {
        [FORM_ERROR]: e.message
      };
    }

    history.push("/");
  };
  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit, submitError, submitting }) => (
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
          {submitError && (
            <Box color="red" mb={3}>
              {submitError}
            </Box>
          )}

          <Box ml="auto">
            <Button
              type="submit"
              variant="secondary"
              isLoading={submitting}
              mr={3}
            >
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
