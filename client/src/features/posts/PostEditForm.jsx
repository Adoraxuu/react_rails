import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchPost, updatePost } from "../../services/postService";

function PostEditForm() {
    const [post, setPost] = useState(null);
    const { id } = useParams();
    const [, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentPost = async () => {
            try{
                const data = await fetchPost(id);
                setPost(data);
            } catch (error) {
                console.log("An error occurred:", error);
            } finally{
                setLoading(false);
            }
        };
        fetchCurrentPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedPost = {
            title: post.title,
            body: post.body,
        };

        try {
            await updatePost(id, updatedPost);
            navigate(`/posts/${id}`);
        } catch (e) {
            console.error("Failed to update post: ", e);
        }
    };

    if(!post) return <div>Loading...</div>;

    return (
        <div>
            <h2>Edit Post</h2>
            <form onSubmit = {handleSubmit}>
                <div>
                    <label htmlFor="post-title">Title:</label>
                    <br />
                    <input
                        type="text"
                        id="post-title"
                        value={post?.title}
                        onChange={(e) => setPost({ ...post, title: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="post-body">Body</label>
                    <textarea
                        id="post-body"
                        value={post.body}
                        onChange={(e) => setPost({ ...post, body: e.target.value })}
                    />
                </div>
                <div>
                    <Link to="/">Back to Posts</Link>
                    {" | "}
                    <button type="submit">Update Post</button>
                </div>
            </form>
        </div>
    );
}

export default PostEditForm;