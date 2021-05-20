import React from 'react';

// Home
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
// Organizations
const Organizations = React.lazy(() => import('./views/organizations/Organizations'));
const CreateOrganization = React.lazy(() => import('./views/organizations/CreateOrganization'));
const UpdateInfoOrganization = React.lazy(() => import('./views/organizations/UpdateInfoOrganization'));
const DetailsOrganization = React.lazy(() => import('./views/organizations/DetailsOrganization'));
// Plans
const Plans = React.lazy(() => import('./views/plans/Plans'));
const CreatePlan = React.lazy(() => import('./views/plans/CreatePlan'));

const routes = [
  { path: '/', exact: true, name: 'Home' },

  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/organizations/organizations', name: 'Organizations', component: Organizations },
  { path: '/organizations/createOrganization', name: 'CreateOrganization', component: CreateOrganization },
  { path: '/organizations/updateInfoOrganization', name: 'UpdateInfoOrganization', component: UpdateInfoOrganization },
  { path: '/organizations/detailsOrganization', name: 'DetailsOrganization', component: DetailsOrganization },

  { path: '/plans/plans', name: 'Plans', component: Plans },
  { path: '/plans/createPlan', name: 'CreatePlan', component: CreatePlan }

];

export default routes;
