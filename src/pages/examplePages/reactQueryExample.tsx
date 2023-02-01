import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import Post from '@components/examples/Post';
import CreatePost from '@components/examples/CreatePost';

import PostsList1 from '../../components/examples/PostList1';
import PostsList2 from '../../components/examples/PostList2';
import PostListPaginated from '../../components/examples/PostListPaginated';
import { getPost } from '../../components/examples/api/posts';

const UseQueryBasics = () => {
  const [currentPage, setCurrentPage] = useState(<PostsList1 />);
  const queryClient = useQueryClient();

  // preFetch data
  const onHoverPostOneLink = () => {
    queryClient.prefetchQuery({
      queryKey: ['posts', 1],
      queryFn: () => getPost(1),
    });
  };

  return (
    <div>
      <button onClick={() => setCurrentPage(<PostsList1 />)}>Posts List 1</button>
      <button onClick={() => setCurrentPage(<PostsList2 />)}>Posts List 2</button>
      <button onMouseEnter={onHoverPostOneLink} onClick={() => setCurrentPage(<Post id={'1'} />)}>
        First Post
      </button>
      <button onClick={() => setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)}>
        New Post
      </button>
      <button onClick={() => setCurrentPage(<PostListPaginated />)}>Post List Paginated</button>
      {/* <button onClick={() => setCurrentPage(<PostListInfinite />)}>Post List Infinite</button> */}
      <br />
      {currentPage}
    </div>
  );
};

export default UseQueryBasics;
