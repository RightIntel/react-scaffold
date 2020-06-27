import React from 'react';<% if (pathVariables.length > 0) { %>
import { useParams } from 'react-router-dom';<% } %>
import LayoutLoggedIn from '../../components/LayoutLoggedIn/LayoutLoggedIn.js';
import './__name__Page.css';

export default function __name__Page() {<% if (pathVariables.length > 0) { %>
    const { <%= pathVariables.join(', ') %> } = useParams();<% } %>

    return (
        <div className="Component Page __name__Page">
            <LayoutLoggedIn width="full" title="<%= pageTitle %>" subtitle="<%= pageSubtitle %>">
                <h1 onClick={changeMe}><%= pageTitle %></h1>
                <p>Edit me</p>
            </LayoutLoggedIn>
        </div>
    );

    function changeMe() {
        alert('Greetings');
    }
}
