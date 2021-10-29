import React from 'react';
import PropTypes from 'prop-types';
import LayoutLoggedIn from '../../components/LayoutLoggedIn/LayoutLoggedIn.js';
import './__name__Page.css';

// TODO: delete any unused props
export default function __name__Page({ route, match, location, history }) {

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

// TODO: delete any and all propTypes not used by this page
__name__Page.propTypes = {
    /** The route object associated with this Page */
    route: PropTypes.shape({
        /** The route path such as /board/:layout/:hash */
        path: PropTypes.string,
        /** If true, do not respond to sub routes */
        exact: PropTypes.bool,
        /** This Page component, usually wrapped in React.lazy */
        component: PropTypes.node,
        /** Array of permissions users need to view this page */
        permission: PropTypes.arrayOf(PropTypes.string),
        /** The name of the page to be used */
        pageName: PropTypes.string,
        /** The developer-friendly page description for Storybook */
        description: PropTypes.string,
    }),
    /** The react-router-dom path match object (see https://reactrouter.com/web/api/match) */
    match: PropTypes.shape({
        /** The parameters in the URL. e.g. /board/:layout/:hash would populate params layout and hash */
        params: PropTypes.shape({
            // TODO: add any path params here
        }).isRequired,
    }).isRequired,
    /** The react-router-dom history object (see https://reactrouter.com/web/api/location) */
    location: PropTypes.shape({
        /** The actual path in the URL bar such as "/users/123" or "/dashboard" */
        pathname: PropTypes.string,
        /** The URL query string such as "?foo=bar&one=1"
        search: PropTypes.string
        /** The hash such as "#section-one" */
        hash: PropTypes.string,
        /** Custom state values passed from <Link />. e.g. <Link to={pathname: '/dashboard', state: { foo: 'bar' }} /> */
        state: PropTypes.object,
    }),
    /** The react-router-dom history object (see https://reactrouter.com/web/api/history) */
    history: PropTypes.shape({
        /** The number of available history steps */
        length: PropTypes.number,
        /** The type of pushState */
        action: PropTypes.oneOf(['PUSH','REPLACE','POP']),
        /** Copy of the location prop above */
        location: PropTypes.object,
        /** Call to push a new location */
        push: PropTypes.function,
        /** Call to replace current location with a new location */
        replace: PropTypes.function,
        /** Call to move forward n number of steps (e.g. -1 for back one) */
        go: PropTypes.function,
        /** Same as to go(-1) */
        goBack: PropTypes.function,
        /** Same as to go(1) */
        goForward: PropTypes.function,
        /** Register a function to intercept any navigation (see https://github.com/remix-run/history/blob/main/docs/blocking-transitions.md) */
        block: PropTypes.function,
    }),
};
