import React from 'react';
import __name__ from './__name__.js';
// import any items you need; including a Component.stories.css if applicable
// TODO: delete this comment block

const markdown = `
&lt;__name__ /&gt; is... TODO: explain this component in markdown

`;

export default {
	title: 'Sharpr/components/__name__',
	component: __name__,
	parameters: {
		docs: {
			description: {
				component: markdown,
			},
		},
	},
};

// The name any exported functions become a label under Sharpr/components/__name__.
// "Example" is fine if you have only one example
// TODO: delete this comment block
export function Example(args) {
	return (
		<__name__ prop1={args.prop1} prop2={args.prop2}>
			children?
		</__name__>
	)
}

// Initial values to show on the "try it" table
Example.args = {
	prop1: 'a',
	prop2: 2,
};

// On occasion your example will have external data or supporting code
// that you don't want to show behind the "Show code" button.
// In that case, pass a string to the "code" below
// TODO: delete this comment or the following code
Example.parameters = {
	docs: {
		source: {
			code: `
<__name__ prop1={a} prop2={2}>
	children?
</__name__>
`,
		},
	},
};
