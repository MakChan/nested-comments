import React from "react";

import { Box } from "rebass";
import { Form, Field } from "react-final-form";
import { Textarea } from "@rebass/forms";

import LinkButton from "./LinkButton";

import { required } from "../utils/validations";

const Edit = ({ onSubmit, text }) => {
  const lines = (text.match(/\n/g) || []).length + 1;

  return (
    <Form onSubmit={onSubmit} initialValues={{ text: text }}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field name="text" validate={required} autoFocus={true}>
            {({ input, meta }) => (
              <>
                <Textarea
                  {...input}
                  rows={lines}
                  my={1}
                  width={[1, 1 / 3, 1 / 4]}
                  autoFocus={true}
                />
                {meta.touched && meta.error && (
                  <Box color="red">{meta.error}</Box>
                )}
              </>
            )}
          </Field>
          <LinkButton type="submit">save</LinkButton>
        </form>
      )}
    </Form>
  );
};

export default Edit;
