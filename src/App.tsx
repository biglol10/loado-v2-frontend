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

// The explanation provided has both accurate and inaccurate elements regarding the implementation and comparison to Next.js. Let's clarify and correct the provided explanation:

// Correct Elements:
// The code indeed uses React's lazy loading and Suspense for dynamic import and rendering of components based on the route accessed, which is similar to how Next.js handles dynamic imports. This technique does improve initial load time by splitting the bundle and loading only the necessary code and resources on demand.
// Inaccuracies/Corrections:
// The comparison to Next.js requires a more nuanced explanation. While the lazy loading technique is used here as in Next.js for on-demand loading, Next.js encompasses more out-of-the-box features like server-side rendering (SSR), static site generation (SSG), and automatic code splitting for optimizing performance. These features contribute significantly to performance improvements, especially for SEO and initial page load times, which are not directly addressed by the code snippet provided.
// Regarding the Recommendations:
// The suggestion to move the lazy and Suspense components outside the Route component loop is not accurately described. In the provided code, lazy is used within the map function to dynamically import components based on the routing configuration. This usage is valid and beneficial for code-splitting at the route level, allowing each page/component to be fetched lazily when its route is accessed.
// However, if the intention was to suggest not to redefine dynamic imports (using lazy) inside a loop or a component that may re-render, leading to potentially unnecessary re-evaluations of lazy, it's worth noting that how lazy and dynamic imports are used here is a common pattern for route-level code splitting in React. Each route's component is imported lazily once, and React's bundling and splitting mechanism ensures that each component is fetched only as needed. There isn't a redefinition issue in the loop as each lazy call corresponds to a unique component based on the routing configuration.
// The advice regarding the ternary operator and the layout component handling aims at improving code readability and maintainability. It suggests refactoring to use a variable for conditional rendering logic outside of the JSX to make the structure clearer. This is a matter of code style and clarity, and while the suggestion might improve readability, the original code's approach is also a common and acceptable practice in React development.
// Summary:

// The initial explanation about dynamic loading is correct but lacks the nuance of comparing all the features provided by Next.js.
// The code's use of lazy and Suspense within a map for route configuration is a standard and efficient approach for route-level code splitting.
// The suggestion about restructuring code for readability and avoiding potential re-evaluations of lazy is based on a misunderstanding of how React's lazy loading and code splitting work in this context. However, recommendations for improving code readability and maintainability are always valuable and should be considered based on the specific project needs and coding standards.
