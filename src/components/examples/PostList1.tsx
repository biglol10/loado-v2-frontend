import { useQuery } from '@tanstack/react-query';
// import { getPosts } from './api/posts';

const wait = (duration: number) => {
  return new Promise(resolve => setTimeout(resolve, duration));
};

const PostList1 = () => {
  // const postsQuery = useQuery({
  //   queryKey: ['posts'],
  //   queryFn: () => wait(1000).then(() => [...POSTS]),
  //   placeholderData: [{ id: 1, title: 'Initial Data' }],
  // });

  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: () => wait(1000).then(() => [...JSON.parse(localStorage.getItem('POSTS')!)]),
    refetchInterval: 100000, // 데이터를 1초마다 가져오기
    // queryFn: () => Promise.reject('Error Message'),
  });

  // postsQuery.fetchStatus === ''

  if (postsQuery.status === 'loading') return <h1>Loading...</h1>;
  if (postsQuery.status === 'error') {
    return <h1>{JSON.stringify(postsQuery.error)}</h1>;
  }

  return (
    <div>
      <h1>Posts List 1</h1>
      <ol>
        {postsQuery.data.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </div>
  );
};

export default PostList1;
