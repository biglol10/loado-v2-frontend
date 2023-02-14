import MainLayout from './layout/MainLayout';

const routeElementMatch = Object.freeze([
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
]);

export default routeElementMatch;
