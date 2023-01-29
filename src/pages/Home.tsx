import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>This is home of the app</h1>
      <h3>The followings are the link to another page</h3>
      <ul>
        <li onClick={() => navigate('/reactQueryExample')}>reactQuery Example Page</li>
      </ul>
    </div>
  );
};

export default Home;
