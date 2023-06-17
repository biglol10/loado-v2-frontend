import { IsMobile } from '@consts/interfaces';
import styled from 'styled-components';

const InheritedMaterials = styled.div`
  border: 1px solid slategrey;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(
    ${localStorage.getItem('deviceType') === 'mobile' ? '1' : '3'},
    1fr
  );
  gap: 10px;
  padding: 10px 20px;

  @media (min-width: 768px) and (max-width: 1024px) {
    grid-template-columns: 2fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const RefineSettingDiv = styled.div<IsMobile>`
  border: 1px solid slategrey;
  display: ${(props) => (props.isMobile ? 'block' : 'flex')};
  padding: ${(props) => (props.isMobile ? '10px 5px' : '10px 20px')};

  > div {
    margin-bottom: ${(props) => (props.isMobile ? '10px' : '0px')};
  }
`;

const H3NoMargin = styled.h3<IsMobile>`
  margin-bottom: ${(props) => (props.isMobile ? '20px' : '0px')};
  margin-right: 20px;
`;

export { InheritedMaterials, RefineSettingDiv, H3NoMargin };
