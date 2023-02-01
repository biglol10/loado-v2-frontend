import { useQuery, useQueries } from '@tanstack/react-query';
import { getPost, getPosts } from './api/posts';

const PostList1 = () => {
  // data from the key ['posts'] is cached and it will show the cached version at first and then if getting from background finishes,
  // the new data will be returned... useQuery gets data from background everytime the component mounts
  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    // refetchInterval: 100000, // refetch every one second
    placeholderData: [{ id: 1, title: 'Initial Data' }],
    // initialData: [{ id: 1, title: 'Initial Data' }], // you are saying this is legit valid data and it's being stored in cache and this data is no longer stale
    // so it will not fetch data... so use placeholderData if you need
  });

  // postsQuery.fetchStatus === 'fetching'

  const queries = useQueries({
    queries: (postsQuery?.data ?? []).map((post) => {
      return {
        queryKey: ['posts', post.id],
        queryFn: () => getPost(post.id),
      };
    }),
  });

  console.log(queries.map((q) => q.data));

  if (postsQuery.status === 'loading') return <h1>Loading...</h1>;
  if (postsQuery.status === 'error') {
    return <h1>{JSON.stringify(postsQuery.error)}</h1>;
  }

  return (
    <div>
      <h1>Posts List 1</h1>
      <ol>
        {postsQuery.data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </div>
  );
};

export default PostList1;
