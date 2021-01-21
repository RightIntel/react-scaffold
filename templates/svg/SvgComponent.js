import React from 'react';
import PropTypes from 'prop-types';

export default function Svg__name__({
	width = __width__,
	height = __height__,
	className = '',
	style = {},
	...moreProps
}) {
	return (
		<svg
			viewBox="0 0 __width__ __height__"
			className={className}
			style={{ width: `${width}px`, height: `${height}px`, ...style }}
			{...moreProps}
		>
			// TODO: Add SVG contents here
		</svg>
	);
}

Svg__name__.propTypes = {
	/** width in pixels */
	width: PropTypes.number,
	/** height in pixels */
	height: PropTypes.number,
	/** className to add */
	className: PropTypes.string,
	/** style properties to apply */
	style: PropTypes.object,
};
