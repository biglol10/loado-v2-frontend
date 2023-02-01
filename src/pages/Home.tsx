import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import InputDefault from '@components/atoms/input/InputDefault';

const Home = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const aa = useRef<any>();

  return (
    <div>
      <h1>This is home of the app</h1>
      <h3>The followings are the link to another page</h3>
      <ul>
        <li onClick={() => navigate('/reactQueryExample')}>reactQuery Example Page</li>
        <li onClick={() => navigate('/inputExample')}>Input Example Page</li>
      </ul>
      <button
        onClick={() => {
          console.log('ref is ');
          console.log(aa);
          aa && aa.current && aa.current.inputElement.focus();

          setInputValue('asdf');
        }}
      >
        asdfdsa
      </button>
      <InputDefault
        key="key"
        id="title"
        stretch={true}
        placeholder="제목"
        ref={aa}
        onChange={(obj: { value: string }) => {
          setInputValue(obj.value);
        }}
        value={inputValue}
      />
    </div>
  );
};

export default Home;
