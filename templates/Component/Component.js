// npm libs:
import React from 'react';
import PropTypes from 'prop-types';
// custom libs:
// components:
// hooks:
// stores:
// css:
import './__name__.css';

export default function __name__({ value = '', setValue = () => {} }) {
    return (
        <div className="Component __name__">
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
    value: PropTypes.string,
    setValue: PropTypes.func,
};
