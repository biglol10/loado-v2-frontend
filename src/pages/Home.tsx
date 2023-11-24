import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import InputDefault from '@components/atoms/input/InputDefault';
import styled from 'styled-components';
import MainLayout from './layout/MainLayout';

const StyledButton = styled.button`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;
  color: gray;
  background: white;
  margin: 10px;
`;

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
      <StyledButton
        onClick={() => {
          console.log('ref is ');
          console.log(aa);
          aa && aa.current && aa.current.inputElement.focus();

          setInputValue('asdf');
        }}
      >
        asdfdsa
      </StyledButton>
      <InputDefault
        key="key"
        id="title"
        stretch={true}
        placeholder="제목"
        ref={aa}
        onChange={(value: string) => {
          setInputValue(value);
        }}
        value={inputValue}
      />
    </div>
  );
};

Home.Layout = MainLayout;

export default Home;
