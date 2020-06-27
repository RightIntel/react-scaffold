// include store we will test
import store from './__name__Store.js';
// allow mocking fetch requests using ky-universal's shims
import fetchMock from 'fetch-mock';
Object.assign(fetchMock.config, global);

// endpoints to mock
fetchMock.get(/foobar\/1$/, { body: 'foo' });
fetchMock.patch(/foobar\/1$/, 204);
fetchMock.mock('*', 404);

describe('__name__Store', () => {
    beforeEach(() => {
        store.reset();
    });
    it('should have initial state', () => {
        expect(store.state).toBeInstanceOf(Object);
    });
    // TODO: add tests then delete this comment
    it('should have initial props', () => {
        expect(store.state.data).toEqual([]);
        expect(store.state.error).toEqual('');
    });
    it('should load data', async () => {
        store.actions.loadData(1);
        await store.nextState();
        expect(store.state.data).toEqual({ body: 'foo' });
    });
    it('should load create something', async () => {
        store.actions.createSomething(1);
        await store.nextState();
        expect(store.state.message).toBe('Created ok');
    });
});
