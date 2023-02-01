import { useInfiniteQuery } from '@tanstack/react-query';
import { getPostsPaginated } from './api/posts';

const PostListInfinite = () => {
  // fetchNextPage function is just what you call whenever you want to get more data
  // hasNextPage will be false in prevData.nextPage is undefined
  const { status, error, data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['posts', 'infinite'],
    getNextPageParam: (prevData) => prevData.nextPage, // prevData is object returned by my api
    queryFn: ({ pageParam = 1 }) => getPostsPaginated(pageParam), // pageParam is whatever returned by getNextPageParam... and use it for api
    // so to conclude, first getNextPageParam is called and gives me nextPage number, then passes it to queryFn and get actual data
  });

  if (status === 'loading') return <h1>Loading...</h1>;
  if (status === 'error') return <h1>{JSON.stringify(error)}</h1>;

  return (
    <>
      <h1>Post List Infinite</h1>
      {data.pages
        .flatMap((dataParam) => dataParam.posts)
        .map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </button>
      )}
    </>
  );
};

export default PostListInfinite;
