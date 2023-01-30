/* eslint-disable no-nested-ternary */
import { useQuery } from '@tanstack/react-query';

const getPost = (id: string) => {
  return new Promise(rs => {
    const POSTS = JSON.parse(localStorage.getItem('POSTS')!);

    const arr = POSTS.filter((el: any) => el.id === id);

    rs(arr);
  });
};

const getUser = (id: string) => {
  return new Promise(rs => {
    const USERS = JSON.parse(localStorage.getItem('USERS')!);

    const arr = USERS.filter((el: any) => el.id === id);

    rs(arr);
  });
};

const Post = ({ id }: { id: string }) => {
  const postQuery: any = useQuery({
    queryKey: ['posts', id],
    queryFn: () => getPost(id).then((res: any) => res[0]),
  });

  // we want this to run after we have postQuery data (use enabled)
  const userQuery: any = useQuery({
    queryKey: ['users', postQuery?.data?.userId],
    enabled: postQuery?.data?.userId != null,
    queryFn: () => getUser(postQuery.data.userId).then((res: any) => res[0]),
  });

  if (postQuery.status === 'loading') return <h1>Loading...</h1>;
  if (postQuery.status === 'error') {
    return <h1>{JSON.stringify(postQuery.error)}</h1>;
  }

  return (
    <>
      <h1>
        {postQuery.data.title} <br />
        <span>{JSON.stringify(userQuery.data)}</span>
        <br />
        <span>{JSON.stringify(postQuery.data)}</span>
        <br />
        <small>
          {userQuery.isLoading
            ? 'Loading User...'
            : userQuery.isError
            ? 'Error Loading User'
            : userQuery.data.name}
        </small>
      </h1>
      <p>{postQuery.data.body}</p>
    </>
  );
};

export default Post;
