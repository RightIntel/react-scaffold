import React from 'react';
import LayoutLoggedOut from '../../components/LayoutLoggedOut/LayoutLoggedOut.jsx';
import './__name__Page.css';

export default function __name__Page() {
    return (
        <LayoutLoggedOut
            className="Page __name__Page"
            width="full"
            title="<%= pageTitle %>"
            subtitle="<%= pageSubtitle %>"
        >
            <h2 onClick={changeMe}><%= pageTitle %></h2>
            <p>Edit me</p>
        </LayoutLoggedOut>
    );

    function changeMe() {
        alert('Greetings');
    }
}

__name__Page.propTypes = {};
