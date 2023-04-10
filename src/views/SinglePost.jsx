import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function SinglePost({ loggedIn, flashMessage }) {

    const navigate = useNavigate();
    const params = useParams();
    const [post, setPost] = useState({});
    const userData = 0

    useEffect(() => {
        fetch(`https://kekambas-blog-api.onrender.com/api/posts/${params.postId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setPost(data);
            })
    }, [params.postId]);

    async function handleDelete() {
        // Get the token from localStorage
        let token = localStorage.getItem('token');
    
        // Set up the request headers
        let myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${token}`);
    
        // Make the fetch request
        let response = await fetch(`https://kekambas-blog-api.onrender.com/api/posts/${params.postId}`, {
            method: 'DELETE',
            headers: myHeaders
        });
        
        let data = await response.json();
    
        if (data.error){
            flashMessage(data.error, 'danger');
        } else {
            flashMessage(`${post.title} has been deleted`, 'success');
            navigate('/');
        };
        

        userData = await fetch(`https://kekambas-blog-api.onrender.com/api/me`, {
            method: 'GET',
            headers: myHeaders
        });
        
    }
    
    console.log(post.id, userData.id)

    return (
        <div>
            <PostCard post={post} />
            <Link className="btn btn-success" to={`/posts/${post.id}/edit`}>Edit Post</Link>
            <input type="submit" value="Delete Post" className='btn btn-danger' onClick={handleDelete}/>
            {/* {loggedIn && post.user_id === loggedIn.id && (
            )} */}
        </div>
    );
}
