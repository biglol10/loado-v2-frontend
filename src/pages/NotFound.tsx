import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NotFoundContainer = styled.div`
  text-align: center;
  padding-top: 50px;
  width: 100%;
  min-height: 100vh;
  background-color: #122438;
`;

const Header = styled.h1`
  font-size: 72px;
  font-weight: bold;
  color: white;
`;

const Text = styled.p`
  font-size: 18px;
  color: white;
`;

const HomeLink = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <Header>404 에러</Header>
      <Text>존재하지 않는 페이지에 접근하였습니다</Text>
      <HomeLink to="/">홈페이지로 돌아가기</HomeLink>
    </NotFoundContainer>
  );
};

export default NotFound;
