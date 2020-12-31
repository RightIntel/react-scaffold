import { lazy } from 'react';

const __name__Route = {
    path: '__path__',
    exact: true,
    component: lazy(() => import('./__name__Page.js')),
    permission: __perms__,
    description: __description__,
};

export default __name__Route;
