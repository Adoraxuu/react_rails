import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { API_URL } from "../../constants";

function PostDetails(){
    const [post, setPost] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchCurrentPost = async () => {
            try{
                const response = await fetch(`${API_URL}/${id}`);
                if (!response.ok) {
                    throw response;
                }
                setPost(json);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCurrentPost();
    }, [id]);

    if (!post) return <div>Loading...</div>;

    return <div>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <Link to={"/"}>Back to Posts</Link>
    </div>
}

export default PostDetails;