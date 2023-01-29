import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const POSTS = [
  { id: '1', title: 'Post 1_1' },
  { id: '2', title: 'Post 1_2' },
];

// ! Styles can vary
// /posts -> ["posts"]
// /posts/1 -> ["posts", 1]
// /posts?authorId=1 -> ["posts", { authorId: 1 }]
// /posts/2/comments -> ["posts", 1, "comments"]

const wait = (duration: number) => {
  return new Promise(resolve => setTimeout(resolve, duration));
};

// queryKey => unique key that you will uniquely identify this query
// queryFn => always receives a promise
const useQueryExample = () => {
  const queryClient = useQueryClient();

  console.log(POSTS); // react-query의 caching이랑 작동방법 때문에 console에서는 바로 보여지지만 화면에선 좀 느리게 표시
  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: () => wait(1000).then(() => [...POSTS]),
    // queryFn: () => Promise.reject('Error Message'),
  });

  const newPostMutation = useMutation({
    mutationFn: (title: string) =>
      wait(1000).then(() => POSTS.push({ id: crypto.randomUUID(), title })),
    onSuccess: () => {
      // whenever we have a successful mutation you would invalidate your posts
      queryClient.invalidateQueries(['posts']);
    },
  });

  if (postsQuery.isLoading) return <h1>Loading...</h1>;
  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>;

  return (
    <>
      {postsQuery.data.map((el, idx) => {
        return <div key={`asdf_${idx}`}>{el.title}</div>;
      })}
      <button
        disabled={newPostMutation.isLoading}
        onClick={() => newPostMutation.mutate('New Post')}
      >
        Add New
      </button>
    </>
  );
};

export default useQueryExample;
