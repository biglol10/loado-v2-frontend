// 만든 페이지는 여기에 route 등록을 해줘야 함
// 여기에선 절대경로 안 먹히니 App.tsx를 기준으로 상대경로 적기
const routeElementMatch = Object.freeze([
  {
    path: '/',
    elementPath: './pages/Home',
  },
  {
    path: '/home',
    elementPath: './pages/Home',
  },
  {
    path: '/reactQueryExample',
    elementPath: './pages/reactQueryExample',
  },
]);

export default routeElementMatch;
