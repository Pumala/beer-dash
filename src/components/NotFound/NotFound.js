import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div>
            <h1>You have entered No Man's Land...</h1>
            <Link to="/">Let's get you back on track</Link>
        </div>
    )
};


export default NotFound;