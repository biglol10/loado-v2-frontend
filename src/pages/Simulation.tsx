import { InputDefaultNumber } from '@components/atoms/input';
import { InputDefault, InputLayout, Image } from '@components/index';
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
  const [categoryObj1, setCategoryObj1] = useState<any>({
    명예의파편: '',
    야금술특화: '',
    재봉술특화: '',
    야금술숙련: '',
    재봉술숙련: '',
  });

  const [categoryObj2, setCategoryObj2] = useState<any>({
    파괴강석: '',
    수호강석: '',
    경명돌: '',
    정제된파괴강석: '',
    정제된수호강석: '',
    찬명돌: '',
  });

  const [categoryObj3, setCategoryObj3] = useState<any>({
    태양의은총: '',
    태양의축복: '',
    태양의가호: '',
    상급오레하: '',
    최상급오레하: '',
  });

  return (
    <div>
      <h3>※ 제련 시뮬레이션</h3>
      <InheritedMaterials>
        <ColumnDiv>
          <h3 className="columnDiv_Title">🛑 명파 + 야금술 (귀속)</h3>
          {Object.keys(categoryObj1).map((objKey: string, idx) => (
            <InputLayout
              key={`Input_${objKey}`}
              inputLabel={
                <>
                  <Image
                    src={loaImages[objKey as keyof typeof loaImages]}
                    imageSize="mini"
                    type="image"
                    circular={true}
                  />
                  <HeaderSpan>{objKey}</HeaderSpan>
                </>
              }
              inputLabelSize={'h5'}
              showInputLabel={true}
              stretch={false}
            >
              <InputDefaultNumber
                key="key"
                id={`ID_${objKey}`}
                placeholder={objKey}
                onChange={(obj: { value: string }) => {
                  setCategoryObj1((prev: any) => {
                    const prevObj = structuredClone(prev);

                    prevObj[objKey] = obj.value;
                    return prevObj;
                  });
                }}
                value={categoryObj1[objKey]}
                type="number"
              />
            </InputLayout>
          ))}
        </ColumnDiv>
        <ColumnDiv>
          <h3 className="columnDiv_Title">🛑 강화석 + 융화제 (귀속)</h3>
          {Object.keys(categoryObj2).map((objKey: string, idx) => (
            <InputLayout
              key={`Input_${objKey}`}
              inputLabel={
                <>
                  <Image
                    src={loaImages[objKey as keyof typeof loaImages]}
                    imageSize="mini"
                    type="image"
                    circular={true}
                  />
                  <HeaderSpan>{objKey}</HeaderSpan>
                </>
              }
              inputLabelSize={'h5'}
              showInputLabel={true}
              stretch={false}
            >
              <InputDefaultNumber
                key="key"
                id={`ID_${objKey}`}
                placeholder={objKey}
                onChange={(obj: { value: string }) => {
                  setCategoryObj2((prev: any) => {
                    const prevObj = structuredClone(prev);

                    prevObj[objKey] = obj.value;
                    return prevObj;
                  });
                }}
                value={categoryObj2[objKey]}
                type="number"
              />
            </InputLayout>
          ))}
        </ColumnDiv>
        <h3 className="columnDiv_Title">🛑 특수/융화 재료 (귀속)</h3>
      </InheritedMaterials>
    </div>
  );
};

export default Simulation;
