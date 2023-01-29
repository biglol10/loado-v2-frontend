import { useState } from 'react';
import PostList1 from '@components/examples/PostList1';
import PostList2 from '@components/examples/PostList2';

const UseQueryBasics = () => {
  const [currentPage, setCurrentPage] = useState(<PostList1 />);

  return (
    <div>
      <button onClick={() => setCurrentPage(<PostList1 />)}>Post Lists 1</button>
      <button onClick={() => setCurrentPage(<PostList2 />)}>Post Lists 2</button>
      <br />
      {currentPage}
    </div>
  );
};

export default UseQueryBasics;
