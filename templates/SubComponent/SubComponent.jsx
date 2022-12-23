import React from 'react';
import PropTypes from 'prop-types';

export default function __name__({
	value = '',
	setValue = () => {},
	className = '',
	children,
	...moreProps
}) {
    return (
        <div className={`Component SubComponent __name__ ${className}`} {...moreProps}>
            <input value={value} onChange={handleTextChange} />
            <button onClick={handleClick}>World</button>
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
    /** TODO: explain this prop */
    value: PropTypes.string,
    /** TODO: explain this prop */
    setValue: PropTypes.func,
    /** An additional className to apply to this component */
    className: PropTypes.string,
    /** Child elements */
    children: PropTypes.node,
};
