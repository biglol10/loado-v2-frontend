import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RouteElementMatch from '@pages/index';
import { Loader } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader active inline="centered" />}>
        <Routes>
          {RouteElementMatch.map((el, idx) => {
            const DynamicElement = lazy(() => import(`${el.elementPath}`)); // 백틱으로 넣어야 작동

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
                      </LayoutComponent>
                    ) : (
                      <DynamicElement />
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
