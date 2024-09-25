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


// ====== BY GPT4p ======

// Breakdown of the Explanation:
// Correct Elements:
// Dynamic Loading Using lazy and Suspense:

// The provided code uses React's lazy and Suspense to dynamically load and render components/pages when the corresponding route is accessed. This approach is indeed similar to Next.js's dynamic imports.
// By doing this, the application can improve the initial load time by splitting the bundle and loading only the required code for the specific route the user accesses.
// Improving Initial Load Time:

// The technique reduces the initial bundle size, improving performance by only loading the necessary resources (JavaScript, CSS, etc.) when a route is accessed. This is a standard approach in React for handling code splitting and on-demand loading.
// Inaccuracies and Corrections:
// Comparison to Next.js:

// The comparison between React's lazy/Suspense and Next.js needs more nuance:
// Next.js automatically handles a lot of performance optimizations, such as automatic code splitting, server-side rendering (SSR), and static site generation (SSG). These features have a significant impact on SEO, initial page load, and overall user experience.
// React's lazy/Suspense only handles client-side rendering and code splitting at the component level. It does not include SSR or SSG out of the box.
// So, while both approaches share the idea of on-demand loading, Next.js provides much broader performance improvements via server-side features.
// Moving lazy and Suspense Outside the Route Loop:

// The suggestion to move lazy and Suspense outside the route loop misunderstands how lazy works in this context. In the provided code, lazy is correctly used inside the loop because each route corresponds to a different component. This ensures that each route dynamically imports the corresponding component only when it's accessed.
// lazy is evaluated only once for each route when the route is first accessed, so there is no unnecessary re-evaluation in future renders. Therefore, there is no inefficiency in leaving the lazy inside the loop.
// Ternary Operator for Layout Components:

// The suggestion about using a variable for conditional rendering of the Layout component is more of a code readability/style recommendation. While this can make the code clearer, it does not affect performance or correctness.
// The original approach with a ternary operator is valid and commonly used in React applications. Refactoring it into a variable is a matter of personal/team preference for readability.
// Final Conclusion:
// The code snippet provided uses a standard and efficient approach to route-level code splitting in React via lazy and Suspense. This dynamic import strategy reduces the initial bundle size and improves performance by loading pages/components on demand.
// Next.js, however, provides additional optimizations, such as SSR, SSG, and automatic code splitting, which offer better performance improvements, especially in terms of SEO and initial page load times.
// The advice about moving lazy outside the loop is based on a misunderstanding—React's lazy function is correctly used in the loop and does not result in performance issues.
// Code readability suggestions about using variables instead of ternary operators for conditional rendering are valid from a maintainability perspective, but the original approach is also perfectly acceptable and common in React development.
// In summary, the explanation is mostly valid but needs clarification on the comparison to Next.js and how lazy works in route-level code splitting. The main points about dynamic loading and performance improvements are accurate, but Next.js offers out-of-the-box features that React does not provide directly.


// 사용자님께서 제공하신 설명에 대한 유효성을 검토해보았습니다. 아래에서 각 부분을 분석하고 그에 대한 평가를 제시하겠습니다.

// 제공된 설명 요약 및 평가
// 동적 로딩과 렌더링에 대한 설명

// 설명:

// 제공된 코드는 사용자가 해당하는 라우트를 요청할 때 페이지/컴포넌트를 동적으로 로드하고 렌더링하며, 이는 Next.js가 작동하는 방식과 유사합니다. 사용자가 특정 라우트로 이동하면, lazy 함수를 통해 필요한 페이지/컴포넌트를 동적으로 로드하고 페이지에 렌더링합니다. 이는 필요한 코드와 리소스만 온디맨드로 로드하여 애플리케이션의 초기 로드 시간을 개선하는 데 도움이 됩니다.

// 평가: 정확합니다. 이 부분은 React의 React.lazy와 Suspense를 사용하여 라우트별로 컴포넌트를 동적으로 로드하는 방식으로, 초기 번들 사이즈를 줄이고 필요한 시점에 필요한 코드만 로드하여 성능을 개선하는 기법을 잘 설명하고 있습니다.

// Next.js의 추가 최적화 기능에 대한 설명

// 설명:

// 그러나 Next.js는 서버사이드 렌더링(SSR)과 자동 코드 스플리팅과 같은 추가적인 최적화를 제공하여 애플리케이션의 성능을 더욱 향상시킬 수 있습니다. 하지만 사용하신 접근 방식도 애플리케이션의 성능을 개선하는 방향으로 나아가는 것입니다.

// 평가: 정확합니다. Next.js는 SSR, SSG, 자동 코드 스플리팅 등을 통해 성능 향상과 SEO 최적화를 지원합니다. 사용자가 적용한 방법도 성능 개선에 기여하지만, Next.js의 추가 기능들과는 차이가 있습니다.

// lazy와 Suspense의 위치 변경 제안

// 설명:

// lazy와 Suspense 컴포넌트를 Route 컴포넌트 루프 밖으로 이동시키세요. lazy는 런타임 시 한 번만 평가되므로, 각 라우트마다 여러 번 생성할 필요가 없습니다.

// 평가: 부정확합니다. lazy를 루프 밖으로 이동시키면 각 라우트별로 동적으로 컴포넌트를 로드할 수 없게 됩니다. 현재 코드에서는 각 라우트에 대해 동적으로 컴포넌트를 임포트하기 위해 루프 내에서 lazy를 사용하고 있습니다. 이는 라우트별 코드 스플리팅을 위한 올바른 패턴입니다. 따라서 lazy를 루프 밖으로 이동시키면 동적 임포트의 이점을 잃게 됩니다.

// LayoutComponent의 조건부 렌더링에 대한 제안

// 설명:

// 삼항 연산자를 사용하여 LayoutComponent를 조건부로 렌더링하는 대신, 동적 임포트를 위한 JSX 요소를 변수에 저장한 다음 LayoutComponent가 존재하면 이를 감싸세요. 이는 코드의 가독성을 높이고 이해하기 쉽게 만듭니다.

// 평가: 타당한 제안입니다. 이 부분은 코드의 가독성과 유지 보수성을 향상시키기 위한 코딩 스타일의 선택입니다. JSX 요소를 변수에 저장하고 조건부로 래핑하는 방식은 코드 구조를 더 명확하게 만들 수 있습니다.

// Next.js와의 비교에 대한 정확성

// 설명:

// 제공된 설명에는 구현 및 Next.js와의 비교에 대해 정확한 부분과 부정확한 부분이 모두 있습니다. 이를 명확히 하고 수정해 보겠습니다.

// 평가: 정확합니다. Next.js와의 비교에서 일부 정확한 내용과 부정확한 내용이 섞여 있으며, 이를 명확히 하는 것은 중요합니다.

// 요약

// 설명:

// 정확한 요소: 제공된 코드는 라우트에 따라 컴포넌트를 동적으로 로드하고 렌더링하기 위해 React의 lazy와 Suspense를 사용하며, 이는 Next.js의 동적 임포트 처리 방식과 유사합니다. 이 기술은 번들을 분할하고 필요한 코드와 리소스를 온디맨드로 로드하여 초기 로딩 시간을 개선합니다.
// 부정확한 요소: Next.js와의 비교는 더 세부적인 설명이 필요합니다. Next.js는 온디맨드 로딩과 함께 SSR, SSG, 자동 코드 스플리팅 등 성능 최적화를 위한 더 많은 기능을 제공합니다. 이러한 기능들은 성능 개선에 크게 기여하며, 제공된 코드 스니펫에서는 직접적으로 다루어지지 않습니다.
// 추천 사항에 대한 의견: lazy와 Suspense 컴포넌트를 Route 컴포넌트 루프 밖으로 이동시키라는 제안은 정확하게 설명되지 않았습니다. 제공된 코드에서 lazy는 라우팅 구성에 따라 동적으로 컴포넌트를 임포트하기 위해 루프 내에서 사용되고 있습니다. 이 사용 방식은 유효하며, 라우트 수준에서 코드 스플리팅을 가능하게 하여 각 페이지/컴포넌트를 필요한 시점에만 가져올 수 있습니다.
// 평가: 전반적으로 정확합니다. 요약에서 정확한 부분과 부정확한 부분을 구분하여 설명하고 있으며, 코드의 동작 방식과 Next.js의 기능을 명확히 비교하고 있습니다.

// 결론
// 동적 로딩 및 코드 스플리팅에 대한 설명은 정확하며, 제공된 코드가 라우트별로 필요한 컴포넌트를 동적으로 로드하여 초기 로딩 시간을 개선하는 방식을 올바르게 설명하고 있습니다.

// Next.js와의 비교에서 Next.js가 SSR, SSG, 자동 코드 스플리팅 등 추가적인 기능을 제공한다는 점은 정확하게 지적되었습니다. 하지만 Next.js의 이러한 기능들은 제공된 코드 스니펫에서는 구현되지 않았으므로, 직접적인 비교보다는 기능적인 차이를 인지하는 것이 중요합니다.

// lazy와 Suspense의 위치 변경 제안은 부정확합니다. 루프 내에서 lazy를 사용하는 것은 각 라우트에 대해 동적 임포트를 가능하게 하며, 이는 라우트별 코드 스플리팅에 필수적입니다. 따라서 lazy를 루프 밖으로 이동시키면 오히려 동적 로딩의 이점을 잃게 됩니다.

// 코드 가독성을 위한 리팩토링 제안은 유효합니다. LayoutComponent의 조건부 렌더링을 개선하여 코드의 가독성을 높이는 것은 좋은 아이디어이며, 팀의 코딩 스타일과 프로젝트의 요구 사항에 따라 고려해 볼 수 있습니다.

// 따라서, 제공된 설명은 대부분 유효하지만 일부 부정확한 제안이 포함되어 있습니다. 특히 lazy와 Suspense를 루프 밖으로 이동시키는 제안은 잘못된 것이므로 적용하지 않는 것이 좋습니다. 그 외의 부분은 정확하며, 코드의 개선을 위한 유용한 의견으로 받아들일 수 있습니다.
