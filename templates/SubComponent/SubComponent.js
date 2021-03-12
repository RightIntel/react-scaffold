import React from 'react';
import PropTypes from 'prop-types';

export default function __name__({ value = '', setValue = () => {} }) {
    return (
        <div className="Component SubComponent __name__">
            <input value={value} onChange={handleTextChange} />
            <button onClick={handleClick}>World</button>
        </div>
    );

    function handleTextChange(evt) {
        setValue(evt.target.value);
    }

    function handleClick() {}
}

__name__.propTypes = {
    /** TODO: explain this prop */
    value: PropTypes.string,
    /** TODO: explain this prop */
    setValue: PropTypes.func.isRequired,
};
