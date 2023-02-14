import React, { useEffect, useState } from 'react';
import { Image } from '@components/index';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { loaImages, loaImageNames } from '@consts/imgSrc';

interface LayoutChildren {
  children: React.ReactNode;
}

const LayoutDiv = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #0e0f15;
`;

const Navigation = styled.header`
  background-color: #40444f;
  display: flex;
  padding-left: 8%;
  align-items: center;
  height: 65px;

  h1 {
    font-family: 'Fredoka One', cursive;
    margin-right: 10px;
    margin-bottom: 0px;
  }

  img {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  ul {
    list-style-type: none;
    display: flex;
    align-items: center;
    margin-left: 50px;
    height: 100%;

    li {
      padding: 0px 20px;
      display: flex;
      align-items: center;
      height: 100%;
      transform: skew(-15deg);
      cursor: pointer;
    }

    li.active {
      background-color: dimgrey;
    }

    li > h3 {
      transform: skew(15deg);
    }
  }
`;

const MainLayout = ({ children }: LayoutChildren) => {
  const [activePage, setActivePage] = useState('pricePage');
  const navigate = useNavigate();

  const changeRoute = (nextRoute: string) => {
    setActivePage(nextRoute);
    // navigate(`/${nextRoute === 'pricePage' ? 'reactQueryExample' : 'inputExample'}`);
  };

  useEffect(() => {
    navigate(`/${activePage === 'pricePage' ? 'reactQueryExample' : 'inputExample'}`);
  }, [activePage, navigate]);

  return (
    <LayoutDiv>
      <Navigation>
        <h1>Loado V2</h1>
        <Image src={loaImages['멸화10']} imageSize="mini" type="image" circular={true} />
        <ul>
          <li
            className={activePage === 'pricePage' ? 'active' : ''}
            onClick={() => changeRoute('pricePage')}
          >
            <h3>아이템 시세</h3>
          </li>
          <li
            className={activePage === 'simulationPage' ? 'active' : ''}
            onClick={() => changeRoute('simulationPage')}
          >
            <h3>제련 시뮬레이션</h3>
          </li>
        </ul>
      </Navigation>
      {children}
    </LayoutDiv>
  );
};

export default MainLayout;
