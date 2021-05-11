import React from 'react';

// Home
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
// Organizations
const Organizations = React.lazy(() => import('./views/organizations/Organizations'));
const CreateOrganization = React.lazy(() => import('./views/organizations/CreateOrganization'));
const DetailsOrganization = React.lazy(() => import('./views/organizations/DetailsOrganization'));
// Plans
const Plans = React.lazy(() => import('./views/plans/Plans'));
const CreatePlan = React.lazy(() => import('./views/plans/CreatePlan'));
// Statistics
const Statistics = React.lazy(() => import('./views/base/statistics/Statistics'));
// Sections
const HeaderSection = React.lazy(() => import('./views/base/sections/HeaderSection'));
const BodySection = React.lazy(() => import('./views/base/sections/BodySection'));

const routes = [
  { path: '/', exact: true, name: 'Home' },

  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/organizations/organizations', name: 'Organizations', component: Organizations },
  { path: '/organizations/createOrganization', name: 'CreateOrganization', component: CreateOrganization },
  { path: '/organizations/detailsOrganization', name: 'DetailsOrganization', component: DetailsOrganization },

  { path: '/plans/plans', name: 'Plans', component: Plans },
  { path: '/plans/createPlan', name: 'CreatePlan', component: CreatePlan },

  { path: '/base/statistics', name: 'Statistics', component: Statistics },

  { path: '/base/sections/headerSection', name: 'HeaderSection', component: HeaderSection },
  { path: '/base/sections/bodySection', name: 'BodySection', component: BodySection },

];

export default routes;
