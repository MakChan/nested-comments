import React, { useState, useEffect } from "react";
import "./App.css";

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
};

const Comment = ({ comment }) => {
  const date = new Date(comment.createdat);
  return (
    <div style={{ marginLeft: "10" * comment.path.length, marginBottom: "5px" }}>
      <div>
        <b>{comment.text}</b>
      </div>
      <div>
        {comment.authorname} - <i>{date.toLocaleDateString("en-IN", dateOptions)}</i>
      </div>
    </div>
  );
};
function App() {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    fetch(
      "http://localhost:3000/.netlify/functions/server/comments/2/recursive"
    )
      .then(comments => comments.json())
      .then(comments => {
        setComments(comments);
      });
  }, []);

  return (
    <>
      <h2>Comments</h2>
      {comments.map(comment => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </>
  );
}

export default App;
