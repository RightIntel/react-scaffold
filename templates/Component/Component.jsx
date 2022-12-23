import React from 'react';
import PropTypes from 'prop-types';
import './__name__.css';

/**
 * &lt;__name__ /&gt; is... TODO: explain this component in markdown for Storybook
 */
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
    /** TODO: explain this prop for Storybook */
    value: PropTypes.string,
    /** TODO: explain this prop for Storybook */
    setValue: PropTypes.func,
    /** An additional className to apply to this component */
    className: PropTypes.string,
    /** Child elements */
    children: PropTypes.node,
};
