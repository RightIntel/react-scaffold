import React from 'react';
import LayoutAdmin from '../../components/LayoutAdmin/LayoutAdmin.jsx';
import './__name__Page.css';

export default function __name__Page() {
    return (
        <LayoutAdmin
            className="Page __name__Page"
            width="full"
            title="<%= pageTitle %>"
            subtitle="<%= pageSubtitle %>"
        >
            <h2 onClick={changeMe}><%= pageTitle %></h2>
            <p>Edit me</p>
        </LayoutAdmin>
    );

    function changeMe() {
        alert('Greetings');
    }
}

__name__Page.propTypes = {};
