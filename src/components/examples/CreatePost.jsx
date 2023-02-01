import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import Post from './Post';

const createPostFunction = ({ title, id }) => {
  return new Promise((rs) => {
    const POSTS = JSON.parse(localStorage.getItem('POSTS'));

    POSTS.push({ id, title, userId: 'biglol@nate.com' });
    localStorage.setItem('POSTS', JSON.stringify(POSTS));
    rs(POSTS);
  }).then((res) => res);
};

// export function createPost({ title, body }) {
//   return axios
//     .post('http://localhost:3000/posts', {
//       title,
//       body,
//       userId: 1,
//       id: Date.now(),
//     })
//     .then(res => res.data);
// }

// eslint-disable-next-line react/prop-types
const CreatePost = ({ setCurrentPage }) => {
  const titleRef = useRef();
  const bodyRef = useRef();
  const queryClient = useQueryClient(); // create 후 백그라운드에서 새로운 데이터를 확인하고 list로 표시해주는데 이게 바로 list표시+반영하는게 아니라 즉각반영을 위해 사전작업

  const createPostMutation = useMutation({
    mutationFn: (variables) => createPostFunction(variables),
    onSuccess: (data, variables, context) => {
      console.log('onSuccess in mutation');
      console.log(data, variables, context);
      queryClient.setQueryData(['posts', variables.id], variables);
      queryClient.invalidateQueries(['posts'], { exact: true }); // without exact every query that starts with posts will be invalidated... ["posts", id] as well
      setCurrentPage(<Post id={variables.id} />);
    },
    onError: (error, variables, context) => {
      console.log('onError in mutation');
      console.log(error, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      console.log('onSettled in mutation');
      console.log(data, error, variables, context);
    },
    onMutate: (variables) => {
      // context
      return { hi: 'Bye' };
    },
    // retry: 3  // ? 에러 발생 시 재시도 횟수
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    createPostMutation.mutate({
      title: titleRef.current.value,
      id: bodyRef.current.value,
    });
  };

  return (
    <div>
      {createPostMutation.isError && JSON.stringify(createPostMutation.error)}
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" ref={titleRef} />
        </div>
        <div>
          <label htmlFor="body">id</label>
          <input id="body" ref={bodyRef} />
        </div>
        <button disabled={createPostMutation.isLoading}>
          {createPostMutation.isLoading ? 'Loading...' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
