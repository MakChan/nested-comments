import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { Heading, Box, Text } from "rebass";
import TimeAgo from "react-timeago";

import { useAuthContext } from "../utils/authContext";
import http from "../utils/http";
import Comments from "../components/Comments";
import TreeComments from "../components/TreeComments";
import Reply from "../components/Reply";
import Error from "../components/Error";
import TextWithEdit from "../components/TextWithEdit";

import LinkButton from "../components/LinkButton";

function PostPage({ isTreeView }) {
  const { userState } = useAuthContext();
  const history = useHistory();
  let { postId } = useParams();

  const [post, setPost] = useState(null);
  const [error, setError] = useState(false);
  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    const fetchPost = async postId => {
      try {
        const url = "posts/" + postId + (isTreeView ? "/tree" : "");
        const result = await http(url);
        setPost(result);
      } catch (e) {
        if (e.status === 400 || e.status === 404) history.push("/not-found");
        else setError(true);
      }
    };

    fetchPost(postId);
    // eslint-disable-next-line
  }, [postId]);

  const addComment = async ({ text }) => {
    let result = await http("comments/" + post.id, "POST", {
      parentComment: "",
      text
    });
    result.authorName = userState.user.username;

    const comments = [result, ...post.comments];
    setPost({ ...post, comments: comments });
  };

  const editPost = async formData => {
    const result = await http("posts/" + postId, "PUT", formData);
    setPost({ ...post, text: result.text, updatedAt: result.updatedAt });
    setEditing(false);
  };

  if (error) return <Error />;
  if (!post) return "Loading";

  return (
    <>
      <Box my={3}>
        <Heading fontSize={[2, 2, 3]} mb={1} color="secondary">
          {post.title}
        </Heading>
        <Box mb={2}>
          By {post.user.username} <TimeAgo date={post.createdAt} />
          {post.createdAt !== post.updatedAt && (
            <>
              {" | "}
              <Text fontSize="12px" as="span">
                (updated <TimeAgo date={post.updatedAt} />)
              </Text>
            </>
          )}
          {" | "}
          {post.comments.length} comments
          {userState.user.id === post.userId && (
            <LinkButton ml={2} onClick={() => setEditing(true)}>
              edit
            </LinkButton>
          )}
        </Box>
        <TextWithEdit
          isEditing={isEditing}
          onSubmit={editPost}
          text={post.text}
        />
      </Box>

      <Reply handleSubmit={addComment} />
      <hr />

      {isTreeView ? (
        <TreeComments
          comments={post.comments}
          user={userState.user}
          postId={post.id}
        />
      ) : (
        <Comments
          comments={post.comments}
          user={userState.user}
          postId={post.id}
        />
      )}
    </>
  );
}

export default PostPage;
