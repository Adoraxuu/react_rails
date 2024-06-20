import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { deletePost as deletePostService, fetchPost } from "../../services/postService";

function PostDetails(){
    const [post, setPost] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchCurrentPost = async () => {
            try{
                const data = await fetchPost(id);
                setPost(data);
            }  catch (error) {
                console.log("An error occurred:", error);
            }
        };
        fetchCurrentPost();
    }, [id]);

    if (!post) return <h2>Loading...</h2>;

    const deletePost = async () => {
        try {
            await deletePostService(id)
            navigate("/")
        } catch(error){
            console.error(error);
        }
    };

    if (!post) return <h2>Loading...</h2>;

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <Link to={`/posts/${post.id}/edit`}>Edit</Link>
            {" | "}
            <Link to="/">Back to Posts</Link>
            {" | "}
            <button onClick={deletePost}>Delete</button>
        </div>
    );
}

export default PostDetails;