import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CommentSection.css";

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [parentCommentId, setParentCommentId] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/comments/post/${postId}`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/comments/post/${postId}`, {
        commenterEmail: "test@example.com", // Replace with actual user email
        content: newComment,
        postId: postId,
        parentCommentId: parentCommentId,
      });
      setComments([...comments, response.data]);
      setNewComment("");
      setParentCommentId(null);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const renderComments = (comments, parentId = null) => {
    return comments
      .filter(comment => (comment.parentComment ? comment.parentComment.id : null) === parentId)
      .map(comment => (
        <div key={comment.id} className={parentId ? "reply" : "comment"}>
          <p>{comment.content}</p>
          <small>Posted by: {comment.commenterEmail}</small>
          <button onClick={() => setParentCommentId(comment.id)}>Reply</button>
          {renderComments(comments, comment.id)}
        </div>
      ));
  };

  return (
    <div className="comment-section-container">
      <h3>Comments</h3>
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
      />
      <button onClick={handleAddComment}>Add Comment</button>

      {renderComments(comments)}
    </div>
  );
};

export default CommentSection;
