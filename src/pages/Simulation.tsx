import { InputDefaultNumber } from '@components/atoms/input';
import Tooltip from '@components/atoms/tooltip/Tooltip';
import {
  InputDefault,
  InputLayout,
  Image,
  InheritedMaterialsCountDesktop,
} from '@components/index';
import { loaImages } from '@consts/imgSrc';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const InheritedMaterials = styled.div`
  border: 1px solid slategrey;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(
    ${localStorage.getItem('deviceType') === 'mobile' ? '1' : '3'},
    1fr
  );
  padding: 10px 0;
`;

// height: 250px;
// overflow-y: auto;
const ColumnDiv = styled.div`
  padding: 2px 20px;
  display: grid;
  grid-template-columns: repeat(
    ${localStorage.getItem('deviceType') === 'mobile' ? '1' : '3'},
    1fr
  );
  grid-row-gap: 15px;

  .columnDiv_Title {
    grid-column: span ${localStorage.getItem('deviceType') === 'mobile' ? '1' : '3'};
    padding: 2px 20px;
    margin: 0px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: red;
  }

  ::-webkit-scrollbar-track {
    background-color: red;
  }
`;

const HeaderSpan = styled.span`
  margin-left: 5px;
`;

const Simulation = () => {
  const [countObjDashboard, setCountObjDashboard] = useState<any>({
    categoryObj1: {
      명예의파편: {
        count: '',
        price: '',
      },
      야금술특화: {
        count: '',
        price: '',
      },
      재봉술특화: {
        count: '',
        price: '',
      },
      야금술숙련: {
        count: '',
        price: '',
      },
      재봉술숙련: {
        count: '',
        price: '',
      },
    },
    categoryObj2: {
      파괴강석: {
        count: '',
        price: '',
      },
      수호강석: {
        count: '',
        price: '',
      },
      경명돌: {
        count: '',
        price: '',
      },
      정제된파괴강석: {
        count: '',
        price: '',
      },
      정제된수호강석: {
        count: '',
        price: '',
      },
      찬명돌: {
        count: '',
        price: '',
      },
    },
    categoryObj3: {
      태양의은총: {
        count: '',
        price: '',
      },
      태양의축복: {
        count: '',
        price: '',
      },
      태양의가호: {
        count: '',
        price: '',
      },
      상급오레하: {
        count: '',
        price: '',
      },
      최상급오레하: {
        count: '',
        price: '',
      },
    },
  });

  useEffect(() => {
    console.log(countObjDashboard);
  }, [countObjDashboard]);

  return (
    <div>
      <h3>※ 제련 시뮬레이션</h3>
      <InheritedMaterials>
        <InheritedMaterialsCountDesktop
          countObjDashboard={countObjDashboard}
          setCountObjDashboard={setCountObjDashboard}
        />
      </InheritedMaterials>
    </div>
  );
};

export default Simulation;
