import { useMemo } from 'react';
import useApiGet from '../../libs/api/hooks/useApiGet/useApiGet.js';
import ensure from '../../libs/ensure/ensure.js';

/**
 * Use data from ...
 * @param {String} arg1
 * @param {Number} arg2
 * @returns {Object}  Stuff
 * @property {Boolean} isLoading  True if data is still loading
 * @property {Boolean} isError  True if there was ane error loading data
 * @property {Array} stuff  Some data stuff
 */
export default function __name__(arg1, arg2) {
    // fetch our stuff
    const { isLoading, isError, response } = useApiGet('/some/stuff', null, { cacheFor: 180 });
    // return data
    return useMemo(
        () => ({
            isLoading,
            isError,
            stuff: ensure.array(response.data),
        }),
        [isLoading, isError, response]
    );
}
