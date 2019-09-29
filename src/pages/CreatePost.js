import React from "react";
import { useHistory } from "react-router-dom";

import { Heading, Box, Button } from "rebass";
import { Textarea, Input, Label } from "@rebass/forms";
import { Form, Field } from "react-final-form";

import http from "../utils/http";
import { required } from "../utils/validations";

const CreatePost = () => {
  const history = useHistory();

  const handleSubmit = async formData => {
    const post = await http("posts/", "POST", formData);
    history.push("/post/" + post.id);
  };
  return (
    <>
      <Heading fontSize={[2, 3, 4]} color="primary" as="h1" mb={3} mt={2}>
        New Post
      </Heading>
      <Form onSubmit={handleSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="title" validate={required}>
              {({ input, meta }) => (
                <>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    {...input}
                    id="title"
                    width={[1, 1 / 3, 1 / 4]}
                    autoFocus={true}
                  />
                  {meta.touched && meta.error && (
                    <Box color="red">{meta.error}</Box>
                  )}
                </>
              )}
            </Field>

            <Field name="text" validate={required}>
              {({ input, meta }) => (
                <>
                  <Label htmlFor="text" mt={3}>
                    Text
                  </Label>
                  <Textarea
                    {...input}
                    id="text"
                    rows="10"
                    width={[1, 1 / 2, 1 / 3]}
                  />
                  {meta.touched && meta.error && (
                    <Box color="red">{meta.error}</Box>
                  )}
                </>
              )}
            </Field>

            <Button
              type="submit"
              mt={2}
              p={1}
              fontWeight="500"
              variant="secondary"
            >
              Add Post
            </Button>
          </form>
        )}
      </Form>
    </>
  );
};

export default CreatePost;
