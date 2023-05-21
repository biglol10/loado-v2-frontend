import React from 'react';
import MainLayout from './layout/MainLayout';

const routeElementMatch: readonly {
  path: string;
  elementPath: string;
  layout: React.ComponentType<any>;
}[] = [
  {
    path: '/',
    elementPath: './pages/Home',
    layout: MainLayout,
  },
  {
    path: '/home',
    elementPath: './pages/Home',
    layout: MainLayout,
  },
  {
    path: '/reactQueryExampleTest',
    elementPath: './pages/examplePages/reactQueryExampleTest',
    layout: MainLayout,
  },
  {
    path: '/reactQueryExample',
    elementPath: './pages/examplePages/reactQueryExample',
    layout: MainLayout,
  },
  {
    path: '/inputExample',
    elementPath: './pages/examplePages/InputExample',
    layout: MainLayout,
  },
  {
    path: '/itemPrice',
    elementPath: './pages/ItemPrice',
    layout: MainLayout,
  },
  {
    path: '/simulation',
    elementPath: './pages/Simulation',
    layout: MainLayout,
  },
];

export default routeElementMatch;
