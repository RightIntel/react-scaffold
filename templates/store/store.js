import { createStore } from 'react-create-use-store';
import api from '../../libs/api/api.js';

const initialState = {
    a: 1,
    message: '',
    hasError: false,
    error: null,
    data: [],
};

const actions = {
    // functions defined below
    loadData,
    createSomething,
};

const __name__Store = createStore({ state: initialState, actions });

export default __name__Store;

//
// Functions only beyond this point
//

function loadData(id) {
    const { state, setState } = __name__Store;
    api.get(`/foobar/${state.a}/${id}`).then(
        response => setState(old => ({ ...old, data: response.data })),
        error => setState(old => ({ ...old, hasError: true, error }))
    );
}

function createSomething(newThing) {
    const { state, setState } = __name__Store;
    api.post(`/foobar/${state.a}`, newThing).then(
        response => setState(old => ({ ...old, message: 'Created ok' })),
        error => setState(old => ({ ...old, error }))
    );
    setState(old => ({ ...old, message: 'Creating' }));
}
