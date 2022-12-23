import React from 'react';
import './__name__Page.css';

export default function __name__Page() {
    return (
        <div className="Component Page __name__Page">
            <h1 onClick={changeMe}><%= pageTitle %></h1>
            <p>Edit me</p>
        </div>
    );

    function changeMe() {
        alert('Greetings');
    }
}

__name__Page.propTypes = {};
