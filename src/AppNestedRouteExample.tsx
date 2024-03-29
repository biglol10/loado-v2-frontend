import { lazy, Suspense, useLayoutEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';
import { isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import RouteElementMatch from '@pages/index';
import { RootState } from '@state/store';
import { setDeviceType, setUserAppId } from '@state/appCommonSlice';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import ScreenLog from '@pages/layout/ScreenLog';
import { nanoid } from '@reduxjs/toolkit';
import NotFound from '@pages/NotFound';
import './App.css';

const DynamicModal = lazy(() => import('@components/modal'));

const CenteredLoader = ({ useDimmer = false }: { useDimmer?: boolean }) => {
  const { loaderShow: isShowLoading } = useSelector((state: RootState) => state.loader);

  if (!isShowLoading) return null;

  const loader = <Loader content="로딩중" active inline="centered" />;

  return useDimmer ? (
    <Dimmer active inverted>
      <Loader inverted>{loader}</Loader>
    </Dimmer>
  ) : (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      {loader}
    </div>
  );
};

// const routeElementMatch = [
//   {
//     path: '/',
//     elementPath: './pages/Home',
//     layout: MainLayout,
//     children: [
//       {
//         path: 'nestedRoute',
//         elementPath: './pages/NestedRoute',
//         layout: MainLayout,
//       },
//       // ... more nested routes as needed ...
//     ],
//   },
//   // ... other routes ...
// ];

// const createRoutes = (routes) => {
//   return routes.map((route, idx) => {
//     const DynamicElement = lazy(() => import(`${route.elementPath}`));
//     const routeElement = <DynamicElement />;
//     const Layout = route.layout;

//     const nestedRoutes = route.children ? createRoutes(route.children) : null;

//     return (
//       <Route
//         key={`pageElement_${idx}`}
//         path={route.path}
//         element={
//           <ScreenLog pageId={route.path.substring(1)} key={route.path}>
//             <Suspense fallback={<CenteredLoader />}>
//               {Layout ? (
//                 <Layout>
//                   {routeElement}
//                   {nestedRoutes}
//                   <DynamicModal />
//                   <ToastContainer />
//                   {isShowLoading && <CenteredLoader useDimmer={true} />}
//                 </Layout>
//               ) : (
//                 <>
//                   {routeElement}
//                   {nestedRoutes}
//                   <DynamicModal />
//                   <ToastContainer className="custom-toast" bodyClassName="custom-toast-body" />
//                   {isShowLoading && <CenteredLoader useDimmer={true} />}
//                 </>
//               )}
//             </Suspense>
//           </ScreenLog>
//         }
//       >
//         {nestedRoutes && nestedRoutes.length > 0 ? (
//           <>
//             {nestedRoutes}
//             <Route path="*" element={<NotFound />} />
//           </>
//         ) : null}
//       </Route>
//     );
//   });
// };

// const RouteElements = createRoutes(routeElementMatch);

const App = () => {
  const publicUrl = process.env.PUBLIC_URL;
  const dispatch = useDispatch();
  const userAppId = useRef('');
  const { loaderShow: isShowLoading } = useSelector((state: RootState) => state.loader);

  // useEffect에선 /itemPrice바로 진입 시 ScreenLog의 useEffect가 먼저 작동할 수 있어 screenLog함수에서 userAppId가 ""가 되는 현상 방지하기 위해 useLayoutEffect
  useLayoutEffect(() => {
    dispatch(setDeviceType(isMobile ? 'mobile' : 'desktop'));

    if (!userAppId.current) {
      const uniqueUserAppId = nanoid();

      userAppId.current = uniqueUserAppId;
      dispatch(setUserAppId(uniqueUserAppId));
    }
  }, [dispatch]);

  const RouteElements = RouteElementMatch.map((el, idx) => {
    const DynamicElement = lazy(() => import(`${el.elementPath}`));
    const routeElement = <DynamicElement />;
    const Layout = el.layout;

    return (
      <Route
        key={`pageElement_${idx}`}
        path={el.path}
        element={
          <ScreenLog pageId={el.path.substring(1)} key={el.path}>
            <Suspense fallback={<CenteredLoader />}>
              {Layout ? (
                <Layout>
                  {routeElement}
                  <DynamicModal />
                  <ToastContainer />
                  {isShowLoading && <CenteredLoader useDimmer={true} />}
                </Layout>
              ) : (
                <>
                  {routeElement}
                  <DynamicModal />
                  <ToastContainer className="custom-toast" bodyClassName="custom-toast-body" />
                  {isShowLoading && <CenteredLoader useDimmer={true} />}
                </>
              )}
            </Suspense>
          </ScreenLog>
        }
      />
    );
  });

  return (
    <Router basename={publicUrl}>
      <Routes>
        {RouteElements}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

// The code you've provided will dynamically load and render pages/components when the corresponding route is requested, similar to how Next.js works.
// When a user navigates to a certain route, the code will dynamically load the required page/component with the lazy function and render it on the page. This helps to improve the initial load time of the application by only loading the necessary code and resources on demand.
// However, Next.js offers some additional optimizations, such as server-side rendering and automatic code-splitting, which can further improve the performance of your application. But the approach you've taken is a step towards improving the performance of your application.

// Move the lazy and Suspense components outside the Route component loop. Since lazy is only evaluated once at runtime, there's no need to create it multiple times for each route.
// Instead of using a ternary operator to conditionally render the LayoutComponent, you can use a variable to store the JSX elements for the dynamic import and then wrap them with the LayoutComponent if it exists. This will make the code more readable and easier to follow.
