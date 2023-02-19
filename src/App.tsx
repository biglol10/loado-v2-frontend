import { Suspense, lazy, JSXElementConstructor as JSX } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RouteElementMatch from '@pages/index';
import { Dimmer, Loader } from 'semantic-ui-react';
import { isMobile } from 'react-device-detect';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/state/store';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

const publicUrl = process.env.PUBLIC_URL;

const DynamicModal = lazy(() => import('@components/modal'));

const CenteredLoader = ({ useDimmer = false }: { useDimmer?: boolean }) => {
  if (!useDimmer) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Loader content="로딩중" active inline="centered" />
      </div>
    );
  }

  return (
    <Dimmer active inverted>
      <Loader inverted>로딩중</Loader>
    </Dimmer>
  );
};

const App = () => {
  localStorage.setItem('deviceType', isMobile ? 'mobile' : 'desktop');

  const { loaderShow: isShowLoading } = useSelector((state: RootState) => state.loader);

  return (
    <Router basename={publicUrl}>
      <Suspense fallback={<CenteredLoader />}>
        <Routes>
          {RouteElementMatch.map((el, idx) => {
            const DynamicElement = lazy(() => import(`${el.elementPath}`)); // 백틱으로 넣어야 작동
            // const DynamicModal = lazy(() => import('@components/modal'));
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
                        {isShowLoading && <CenteredLoader useDimmer={true} />}
                      </LayoutComponent>
                    ) : (
                      <>
                        <DynamicElement />
                        <DynamicModal />
                        {isShowLoading && <CenteredLoader useDimmer={true} />}
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
