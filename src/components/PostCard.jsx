import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({ post, loggedIn }) {
    return (
        <div className="card mt-3">
            <div className="row g-0">
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{ post.title }</h5>
                        <h6 className="card-subtitle">By: { post.user_id }</h6>
                        <p className="card-text">{ post.content }</p>
                        <Link className='btn btn-primary me-2' to={`/posts/${post.id}`}>See More</Link>
                        {loggedIn && (post.user_id === localStorage.getItem('userId')) &&
                        <Link className='btn btn-secondary' to={`/posts/${post.id}/edit`}>Edit</Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
