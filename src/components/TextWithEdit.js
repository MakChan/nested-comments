import React, { useState, useEffect, useRef } from "react";

import { Box, Text } from "rebass";
import { Form, Field } from "react-final-form";
import { Textarea } from "@rebass/forms";

import LinkButton from "./LinkButton";

import { required } from "../utils/validations";

const Edit = ({ onSubmit, text, isEditing }) => {
  const [lines, setLines] = useState(0);
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    setLines(Math.ceil(ref.current.clientHeight / 16));
    setWidth(ref.current.clientWidth);
  }, []);

  if (isEditing)
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
                    width={width}
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

  return (
    <Text
      my={1}
      fontSize={1}
      display="inline-block"
      sx={{ whiteSpace: "pre-wrap", lineHeight: "16px" }}
      ref={ref}
    >
      {text}
    </Text>
  );
};

export default Edit;
