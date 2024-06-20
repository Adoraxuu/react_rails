import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { fetchAllPosts, deletePost } from "../../services/postService";

function PostsList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await fetchAllPosts();
                setPosts(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        loadPosts();
    }, []);

    const deletePostHandler = async (id) => {
        try {
            await deletePost(id);
            setPosts(posts.filter((post) => post.id !== id))
        } catch (e) {
            console.error(e);
        }
    };

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
                    <div className="post-links">
                        <button onClick={() => deletePostHandler(post.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PostsList;