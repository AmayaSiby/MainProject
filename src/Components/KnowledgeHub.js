import React, { useState, useEffect } from "react";
import axios from "axios";
import "./KnowledgeHub.css";
import { Link } from "react-router-dom";

const KnowledgeHub = () => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [email, setEmail] = useState(localStorage.getItem("email") || ""); // Get logged-in user's email

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/knowledge-hub");
            const allPosts = response.data;
            // Filter posts to show only the logged-in user's posts
            const userPosts = allPosts.filter(post => post.farmerEmail === email);
            setPosts(userPosts);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const createPost = async () => {
        if (!title || !content) {
            alert("Please fill in all fields");
            return;
        }

        try {
            await axios.post("http://localhost:8080/api/knowledge-hub", {
                farmerEmail: email, // Use logged-in user's email
                title,
                content
            });

            setTitle("");
            setContent("");
            fetchPosts(); // Refresh the user's posts
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    const deletePost = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/knowledge-hub/${id}`);
            fetchPosts(); // Refresh the user's posts
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return (
        <div className="container">
            <nav className="sidebar">
                <h2 className="sidebar-title">Harvest Hub</h2>
                <ul>
                    <li><a href="/farmer-dashboard">Home</a></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/spices">Add Spices</Link></li>
                    <li><a href="/farmorder">Orders</a></li>
                </ul>
                <div className="logout">
                    <Link to="/logout">Logout</Link>
                </div>
            </nav>

            {/* Form for creating a new post */}
            <div className="form-container">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="form-control mt-2"
                    placeholder="Share your farming methodology..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <button className="btn btn-success mt-2" onClick={createPost}>
                    Share Post
                </button>
            </div>

            {/* Displaying the logged-in user's posts */}
            <div>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.id} className="card my-3">
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.content}</p>
                                <p><small className="text-muted">By: {post.farmerEmail}</small></p>
                                <button className="btn btn-danger" onClick={() => deletePost(post.id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No posts found. Start by sharing your knowledge!</p>
                )}
            </div>
        </div>
    );
};

export default KnowledgeHub;
