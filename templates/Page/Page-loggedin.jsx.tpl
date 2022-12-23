import React from 'react';
import LayoutLoggedIn from '../../components/LayoutLoggedIn/LayoutLoggedIn.jsx';
import './__name__Page.css';

export default function __name__Page() {
    return (
        <LayoutLoggedIn
            className="Page __name__Page"
            width="full"
            title="<%= pageTitle %>"
            subtitle="<%= pageSubtitle %>"
        >
            <h2 onClick={changeMe}><%= pageTitle %></h2>
            <p>Edit me</p>
        </LayoutLoggedIn>
    );

    function changeMe() {
        alert('Greetings');
    }
}

__name__Page.propTypes = {};
