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
    margin-left: ${localStorage.getItem('deviceType') === 'mobile' ? '20px' : '50px'};
    height: ${localStorage.getItem('deviceType') === 'mobile' ? 'auto' : '100%'};

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
  const [activePage, setActivePage] = useState('simulation');
  const navigate = useNavigate();

  const deviceType = localStorage.getItem('deviceType');

  const changeRoute = (nextRoute: string) => {
    setActivePage(nextRoute);
  };

  // inputExample
  useEffect(() => {
    navigate(`/${activePage}`);
  }, [activePage, navigate]);

  return (
    <LayoutDiv>
      <Navigation>
        {deviceType === 'mobile' ? <h1>Loado</h1> : <h1>Loado V2</h1>}
        {deviceType !== 'mobile' && (
          <Image src={loaImages['멸화10']} imageSize="mini" type="image" circular={true} />
        )}

        <ul>
          <li
            className={activePage === 'itemPrice' ? 'active' : ''}
            onClick={() => changeRoute('itemPrice')}
          >
            <h3>{deviceType === 'mobile' ? '시세' : '아이템 시세'}</h3>
          </li>
          <li
            className={activePage === 'simulation' ? 'active' : ''}
            onClick={() => changeRoute('simulation')}
          >
            <h3>{deviceType === 'mobile' ? '시뮬' : '재련 시뮬레이션'}</h3>
          </li>
          {deviceType !== 'mobile' && (
            <li
              className={activePage === 'inputExample' ? 'active' : ''}
              onClick={() => changeRoute('inputExample')}
            >
              <h3>예시 페이지</h3>
            </li>
          )}
        </ul>
      </Navigation>
      <div className="appContent">{children}</div>
    </LayoutDiv>
  );
};

export default MainLayout;
