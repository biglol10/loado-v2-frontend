import { useQuery, useMutation } from '@tanstack/react-query';

const POSTS = [
  { id: '1', title: 'Post 1' },
  { id: '2', title: 'Post 2' },
];

const wait = (duration: number) => {
  return new Promise(resolve => setTimeout(resolve, duration));
};

// queryKey => unique key that you will uniquely identify this query
// queryFn => always receives a promise
const useQueryExample = () => {
  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: () => wait(1000).then(() => [...POSTS]),
    // queryFn: () => Promise.reject('Error Message'),
  });

  const newPostMutation = useMutation({
    mutationFn: (title: string) =>
      wait(1000).then(() => POSTS.push({ id: crypto.randomUUID(), title })),
  });

  if (postsQuery.isLoading) return <h1>Loading...</h1>;
  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>;

  return (
    <>
      {postsQuery.data.map((el, idx) => {
        return <div key={`asdf_${idx}`}>{el.title}</div>;
      })}
    </>
  );
};

export default useQueryExample;
