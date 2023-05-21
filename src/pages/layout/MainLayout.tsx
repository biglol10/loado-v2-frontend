/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Image } from '@components/index';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { loaImages } from '@consts/imgSrc';
import useDeviceType from '@hooks/DeviceTypeHook';
import { IIsMobile } from '@consts/interfaces';

const LayoutDiv = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #122438;
`;

const Navigation = styled.header<IIsMobile>`
  border-bottom: 2px solid slategrey;
  background-color: #122438;
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
    margin-left: ${(props) => (props.isMobile ? '20px' : '50px')};

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

interface LayoutChildren {
  children: React.ReactNode;
}

export enum ERoute {
  DEV = '/dev',
  ITEMPRICE = '/itemPrice',
  SIMULATION = '/simulation',
  INPUTEXAMPLE = '/inputExample',
}

const MainLayout = ({ children }: LayoutChildren) => {
  const [activePage, setActivePage] = useState<string | keyof typeof ERoute>(() => {
    const currentRoute = location.pathname.replace(ERoute.DEV, '');

    if (currentRoute && currentRoute !== '/' && currentRoute !== ERoute.DEV) return currentRoute;
    else return ERoute.ITEMPRICE;
  });
  const navigate = useNavigate();
  const deviceType = useDeviceType();

  const changeRoute = (nextRoute: string) => {
    setActivePage(nextRoute);
  };

  useEffect(() => {
    navigate(`${activePage}`);
  }, [activePage, navigate]);

  return (
    <LayoutDiv>
      <Navigation isMobile={deviceType === 'mobile'}>
        {deviceType === 'mobile' ? <h1>Loado</h1> : <h1>Loado V2</h1>}
        {deviceType !== 'mobile' && (
          <Image src={loaImages['멸화10']} imageSize="mini" type="image" circular={true} />
        )}

        <ul>
          <li
            className={activePage === ERoute.ITEMPRICE ? 'active' : ''}
            onClick={() => changeRoute(ERoute.ITEMPRICE)}
          >
            <h3>{deviceType === 'mobile' ? '시세' : '아이템 시세'}</h3>
          </li>
          <li
            className={activePage === ERoute.SIMULATION ? 'active' : ''}
            onClick={() => changeRoute(ERoute.SIMULATION)}
          >
            <h3>{deviceType === 'mobile' ? '시뮬' : '재련 시뮬레이션'}</h3>
          </li>
          {deviceType !== 'mobile' && (
            <li
              className={activePage === ERoute.INPUTEXAMPLE ? 'active' : ''}
              onClick={() => changeRoute(ERoute.INPUTEXAMPLE)}
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
