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

  const RouteElements = RouteElementMatch.map((el, idx) => {
    const DynamicElement = lazy(() => import(`${el.elementPath}`));
    const routeElement = <DynamicElement />;
    const element = el.layout ? (
      <el.layout>
        {routeElement}
        <DynamicModal />
        {isShowLoading && <CenteredLoader useDimmer={true} />}
      </el.layout>
    ) : (
      <>
        {routeElement}
        <DynamicModal />
        {isShowLoading && <CenteredLoader useDimmer={true} />}
      </>
    );

    return <Route key={`pageElement_${idx}`} path={el.path} element={element} />;
  });

  return (
    <Router basename={publicUrl}>
      <Suspense fallback={<CenteredLoader />}>
        <Routes>{RouteElements}</Routes>
      </Suspense>
    </Router>
  );
};

export default App;

// Move the lazy and Suspense components outside the Route component loop. Since lazy is only evaluated once at runtime, there's no need to create it multiple times for each route.
// Instead of using a ternary operator to conditionally render the LayoutComponent, you can use a variable to store the JSX elements for the dynamic import and then wrap them with the LayoutComponent if it exists. This will make the code more readable and easier to follow.
