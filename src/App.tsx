import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RouteElementMatch from '@pages/index';
import { Loader } from 'semantic-ui-react';
import { isMobile } from 'react-device-detect';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

const publicUrl = process.env.PUBLIC_URL;

const App = () => {
  localStorage.setItem('deviceType', isMobile ? 'mobile' : 'desktop');

  return (
    <Router basename={publicUrl}>
      <Suspense fallback={<Loader active inline="centered" />}>
        <Routes>
          {RouteElementMatch.map((el, idx) => {
            const DynamicElement = lazy(() => import(`${el.elementPath}`)); // 백틱으로 넣어야 작동
            const DynamicModal = lazy(() => import('@components/modal'));
            const LayoutComponent = el.layout;

            return (
              <Route
                key={`pageElement_${idx}`}
                path={el.path}
                element={
                  <>
                    {LayoutComponent ? (
                      <LayoutComponent>
                        <DynamicElement />
                        <DynamicModal />
                      </LayoutComponent>
                    ) : (
                      <>
                        <DynamicElement />
                        <DynamicModal />
                      </>
                    )}
                  </>
                }
              />
            );
          })}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
