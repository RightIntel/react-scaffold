import React from 'react';
import FunctionExplorer from '../../../.storybook/function-explorer/FunctionExplorer/FunctionExplorer.js';
import __name__ from './__name__.js';

export default {
	title: 'Sharpr/libs/__name__()',
	component: __name__,
	parameters: {
		docs: {
			transformSource: () => FunctionExplorer.getSource(__name__),
		},
	},
};

// TODO: update args as appropriate
export function TryIt(args) {
	return <FunctionExplorer func={__name__} args={[args.bytes, args.precision]} />;
}
TryIt.args = {
	bytes: 1000 * 1000 * 45,
	precision: 'auto',
};
