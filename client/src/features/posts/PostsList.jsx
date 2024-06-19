import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { API_URL } from "../../constants";

function PostsList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const response = await fetch(API_URL);
                const json = await response.json();
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${json.message || 'Unexpected error'}`);
                }
                setPosts(json);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            {posts.map((post) => (
                <div key={post.id} className="post-container">
                    <h2>
                        <Link to={`/posts/${post.id}`} className="post-title">
                            {post.title}
                        </Link>
                    </h2>
                    
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    );
}

export default PostsList;