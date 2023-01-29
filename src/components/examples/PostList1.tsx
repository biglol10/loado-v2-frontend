import { useQuery } from '@tanstack/react-query';
// import { getPosts } from './api/posts';

const POSTS = [
  { id: '1_1', title: 'Post 1_1' },
  { id: '1_2', title: 'Post 1_2' },
];

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
    queryFn: () => wait(1000).then(() => [...POSTS]),
    // queryFn: () => Promise.reject('Error Message'),
  });

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
