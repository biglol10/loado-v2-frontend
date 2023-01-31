import { useState } from 'react';
import PostList1 from '@components/examples/PostList1';
import PostList2 from '@components/examples/PostList2';
import { useQueryClient } from '@tanstack/react-query';
import Post from '@components/examples/Post';
import CreatePost from '@components/examples/CreatePost';

const POSTS = [
  { id: '1_1', title: 'Post 1_1', userId: 'biglol@nate.com' },
  { id: '1_2', title: 'Post 1_2', userId: 'asdf@nate.com' },
];

const getPost = (id: string) => {
  return new Promise((rs) => {
    rs(POSTS.filter((el) => el.id === id));
  });
};

const UseQueryBasics = () => {
  const [currentPage, setCurrentPage] = useState(<PostList1 />);
  const queryClient = useQueryClient();

  const onHoverPostOneLink = () => {
    queryClient.prefetchQuery({
      queryKey: ['posts', 1],
      queryFn: () =>
        getPost('1_1').then((res: any) => {
          console.log(res);
          return res;
        }),
    });
  };

  return (
    <div>
      <button onClick={() => setCurrentPage(<PostList1 />)}>Post Lists 1</button>
      <button onClick={() => setCurrentPage(<PostList2 />)}>Post Lists 2</button>
      <button onMouseEnter={onHoverPostOneLink} onClick={() => setCurrentPage(<Post id={'1_1'} />)}>
        First Post
      </button>
      <button onClick={() => setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)}>
        New Post
      </button>
      <br />
      {currentPage}
    </div>
  );
};

export default UseQueryBasics;
