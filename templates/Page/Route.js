import { lazy } from 'react';

const __name__Route = {
    path: '__path__',
    exact: true,
    component: lazy(() => import('./__name__Page.js')),
    permission: [],
};

export default __name__Route;
