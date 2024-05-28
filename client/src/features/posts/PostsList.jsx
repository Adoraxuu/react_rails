import React, { useState, useEffect } from 'react';
import { API_URL } from "../../constants"

function PostList(){
    const [posts, setPosts] = useState([]);
    const [, setLoading] = useState(true);
    const [, setError] = useState(null);

    useEffect(() => {
        async function loadPosts(){
            try {
                const response = await fetch(API_URL);
                if (response.ok) {
                    const json = await response.json();
                    setPosts(json);
                } else {
                    throw response;
                }
            } catch (error) {
                setError(error);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }
        loadPosts();
    }, []);

    return (
        <div>
            {posts.map((post)=>{
                <div key={post.id} className='post-container'>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </div>
            })}
        </div>
    );
}

export default PostList