import React from 'react';
import __name__ from './__name__.js';
// import any items you need; including a Component.stories.css if applicable
// TODO: delete this comment block

export default {
	title: 'Sharpr/hooks/__name__()',
	component: () => {},
};

// The name any exported functions become a label under Sharpr/components/__name__.
// "Example" is fine if you have only one example
// TODO: delete this comment block
export function Example() {
	const { res1, res2 } = __name__(arg1, arg2);
	return (
		<div className="Component MyComponent">
			<div>TODO: Explain hook here</div>
			<div className={res1}>{res2}</div>
		</div>
	);
}

// Initial values to show on the "try it" table
Example.args = {
	prop1: 'a',
	prop2: 2,
};
