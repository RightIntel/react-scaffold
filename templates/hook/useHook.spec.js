import { renderHook } from '@testing-library/react-hooks';
import __name__ from './__name__.js';
// --- Docs on react hook testing ---
// renderHook examples
// https://betterprogramming.pub/test-custom-hooks-using-react-hooks-testing-library-a3a37031a9be
// Advanced uses of mocking
// https://jestjs.io/docs/en/mock-function-api

describe('__name__', () => {
    // TODO: add tests then delete this comment
    it('should do stuff', async () => {
        // set up
        const useIt = () => __name__();
        const { result, waitForNextUpdate } = renderHook(useIt);
        // check initial state
        expect(result.current.increment).toBeInstanceOf(Function);
        // manipulate initial state
        result.current.increment();
        // wait for state to get updated
        await waitForNextUpdate();
        // check new state
        expect(result.current.count).toBe(1);
    });
});
