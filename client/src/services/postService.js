import { API_URL } from"../constants";

async function handleResponse(response){
    if (!response.ok){
        throw new Error(response.statusText)
    }
    return response.status === 204 ? null :response.json();
}
async function fetchAllPosts() {
    const response = await fetch(API_URL);
    return handleResponse(response)
}

async function fetchPost(id){
    const response = await fetch(`${API_URL}/${id}`);
    return handleResponse(response)
}

async function deletePost(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    return handleResponse(response)
}

async function createPost(postData){
    const response = await fetch(`${API_URL}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
    });
    return handleResponse(response)
}

async function updatePost(id, postData){
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    });
    return handleResponse(response)
}
export { fetchAllPosts, fetchPost, deletePost, createPost, updatePost };
