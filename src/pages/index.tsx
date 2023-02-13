import MainLayout from './layout/MainLayout';

// 만든 페이지는 여기에 route 등록을 해줘야 함
// 여기에선 절대경로 안 먹히니 App.tsx를 기준으로 상대경로 적기
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
