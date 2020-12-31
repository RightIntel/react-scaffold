import React from 'react';
import __name__ from './__name__.js';

export default {
	title: 'Sharpr/hooks/__name__()',
	component: Example,
};

export function Example() {
	const { res1, res2 } = __name__(arg1, arg2);
	return (
		<div className="Component MyComponent">
			<div>TODO: Explain hook here</div>
			<div className={res1}>{res2}</div>
		</div>
	);
}
