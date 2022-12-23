// RUN ONLY THIS TEST: npm test __name__.spec.js
import React from 'react';
import __name__ from './__name__.js';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Example } from './__name__.stories.jsx';
// --- Docs on react testing ---
// getByText(), getAllByText(), etc.; fireEvent; act()
// https://testing-library.com/docs/react-testing-library/cheatsheet
// functions after expect() such as toMatchSnapshot(), toHaveClass()
// https://github.com/testing-library/jest-dom
// Advanced uses of mocking
// https://jestjs.io/docs/en/mock-function-api
// Using mocks and testing asynchronous code
// https://testing-library.com/docs/react-testing-library/example-intro

describe('__name__', () => {
    it('should be a function', () => {
        expect(__name__).toBeInstanceOf(Function);
    });
    it('should render correctly', () => {
        const { container } = render(<Example {...Example.args} />);
        expect(container).toMatchSnapshot();
    });
    // TODO: add tests then delete this comment
    it('EXAMPLE: should respond to clicks', () => {
        const { container, getByText } = render(<Example {...Example.args} />);
        fireEvent.click(getByText('One'));
        expect(getByText('One')).toHaveClass('open');
        expect(container).toMatchSnapshot();
    });
});
