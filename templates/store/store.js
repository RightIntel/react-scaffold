import { Store, useStoreSelector } from 'react-thermals';
import api from '../../libs/api/api.js';

const store = new Store({
    state: {
        a: 1,
        message: '',
        hasError: false,
        error: null,
        data: [],
    },
    actions: {
        /**
         * TODO: add docs
         * @param {Number} id
         */
        loadData(id) {
            const state = store.getState();
            api.get(`/foobar/${state.a}/${id}`).then(
                response => store.setState(old => ({ ...old, data: response.data })),
                error => store.setState(old => ({ ...old, hasError: true, error }))
            );
        },
        /**
         * TODO: add docs
         * @param {Object} newThing
         */
        createSomething(newThing) {
            const state = store.getState();
            store.setState(old => ({ ...old, message: 'Creating' }));
            api.post(`/foobar/${state.a}`, newThing).then(
                response => store.setState(old => ({ ...old, message: 'Created ok' })),
                error => store.setState(old => ({ ...old, error }))
            );
        }
    }
});

export const __name__Store = store;
export const __name__Actions = store.actions;
export default function use__Name__(selector) {
    return useStoreSelector(store, selector);
}
