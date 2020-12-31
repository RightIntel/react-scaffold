// npm libs:
import React from 'react';
import PropTypes from 'prop-types';
// custom libs:
// components:
// hooks:
// stores:
// css:
import './__name__.css';
// TODO: delete comments above this line

export default function __name__({
    value = '',
    setValue = () => {},
    className = '',
    children,
    ...moreProps
}) {
    return (
        <div className={`Component __name__ ${className}`} {...moreProps}>
            <input value={value} onChange={handleTextChange} />
            <button onClick={handleClick}>World</button>
            {children}
        </div>
    );

    function handleTextChange(evt) {
        setValue(evt.target.value);
    }

    function handleClick() {
        alert('You clicked!');
    }
}

__name__.propTypes = {
    /** TODO: add comment for Storybook */
    value: PropTypes.string,
    /** TODO: add comment for Storybook */
    setValue: PropTypes.func.isRequired,
    /** TODO: add comment for Storybook */
    className: PropTypes.string,
    /** TODO: add comment for Storybook */
    children: PropTypes.node.isRequired,
};
