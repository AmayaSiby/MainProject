import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./PostPage.css";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/knowledge-hub/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="post-page-container">
      <div className="back-button-container">
        <Link to="/farmer-dashboard">
          <button>Back to Dashboard</button>
        </Link>
      </div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p><small>Posted by: {post.farmerEmail}</small></p>
    </div>
  );
};

export default PostPage;
