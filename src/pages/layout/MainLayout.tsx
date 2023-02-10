import React from 'react';
import { Image } from '@components/index';
import styled from 'styled-components';
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
  padding: 0.5rem 0;
  display: flex;
  padding-left: 8%;

  h1 {
    font-family: 'Fredoka One', cursive;
    margin-right: 10px;
    margin-bottom: 0px;
  }
`;

const MainLayout = ({ children }: LayoutChildren) => {
  return (
    <LayoutDiv>
      <Navigation>
        <h1>Loado v2</h1>
        <Image src={loaImages['멸화10']} imageSize="mini" type="image" />
      </Navigation>
      {children}
    </LayoutDiv>
  );
};

export default MainLayout;
