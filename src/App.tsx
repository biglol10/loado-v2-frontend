import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RouteElementMatch from '@pages/index';
import './App.css';

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>LoadingInApp.tsx...</div>}>
        <Routes>
          {RouteElementMatch.map((el, idx) => {
            const DynamicElement = lazy(() => import(`${el.elementPath}`)); // 백틱으로 넣어야 작동

            return <Route key={`pageElement_${idx}`} path={el.path} element={<DynamicElement />} />;
          })}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
