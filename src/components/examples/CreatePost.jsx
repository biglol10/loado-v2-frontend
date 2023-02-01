import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { createPost } from './api/posts';
import Post from './Post';

// eslint-disable-next-line react/prop-types
const CreatePost = ({ setCurrentPage }) => {
  const titleRef = useRef();
  const bodyRef = useRef();
  const queryClient = useQueryClient(); // create 후 백그라운드에서 새로운 데이터를 확인하고 list로 표시해주는데 이게 바로 list표시+반영하는게 아니라 즉각반영을 위해 사전작업

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data, variables, context) => {
      // create a brand new post inside of my query
      // the following line allows you to create a brand new entry in my cache that is pointing to this query key with this data
      queryClient.setQueryData(['posts', data.id], data);
      queryClient.invalidateQueries(['posts'], { exact: true }); // without exact every query that starts with posts will be invalidated... ["posts", id] as well
      setCurrentPage(<Post id={data.id} />); // you can see the newly created data instantaneously because of setQueryData
    },
    onError: (error, variables, context) => {},
    onMutate: (variables) => {
      // called before mutationFn... this will be context on onSuccess
      return { hi: 'Bye' };
    },
  });

  // eslint-disable-next-line func-style
  function handleSubmit(e) {
    e.preventDefault();
    createPostMutation.mutate({
      title: titleRef.current.value,
      body: bodyRef.current.value,
    });
  }

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
          <label htmlFor="body">Body</label>
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
