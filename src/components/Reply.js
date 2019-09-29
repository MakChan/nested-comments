import React from "react";

import { Box, Button } from "rebass";
import { Textarea } from "@rebass/forms";
import { Form, Field } from "react-final-form";

import { required } from "../utils/validations";

const Reply = ({ handleSubmit, autoFocus }) => (
  <Form onSubmit={handleSubmit}>
    {({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <Field name="text" validate={required}>
          {({ input, meta }) => (
            <>
              <Textarea
                {...input}
                width={[1, 1 / 2, 1 / 3]}
                autoFocus={autoFocus}
              />
              {meta.touched && meta.error && (
                <Box color="red">{meta.error}</Box>
              )}
            </>
          )}
        </Field>

        <Button type="submit" mt={2} p={1} fontWeight="500" variant="secondary">
          Add Comment
        </Button>
      </form>
    )}
  </Form>
);

export default Reply;
