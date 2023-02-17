import { InputDefaultNumber } from '@components/atoms/input';
import { InputLayout, Image } from '@components/index';
import { loaImages } from '@consts/imgSrc';
import styled from 'styled-components';

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

const InheritedMaterialsCountDesktop = ({ countObjDashboard, setCountObjDashboard }: any) => {
  const categoryTextMapping = {
    categoryObj1: '🛑 명파 + 야금술 (귀속)',
    categoryObj2: '🛑 강화석 + 융화제 (귀속)',
    categoryObj3: '🛑 특수/융화 재료 (귀속)',
  };

  return (
    <>
      {Object.keys(countObjDashboard).map((countObj: string) => (
        <ColumnDiv key={`columnDiv_${countObj}`}>
          <h3 className="columnDiv_Title">
            {categoryTextMapping[countObj as keyof typeof categoryTextMapping]}
          </h3>
          {Object.keys(countObjDashboard[countObj]).map((subObjKey: string) => (
            <InputLayout
              key={`Input_${subObjKey}`}
              inputLabel={
                <>
                  <Image
                    src={loaImages[subObjKey as keyof typeof loaImages]}
                    imageSize="mini"
                    type="image"
                    circular={true}
                  />
                  <HeaderSpan>{subObjKey}</HeaderSpan>
                </>
              }
              inputLabelSize={'h5'}
              showInputLabel={true}
              stretch={false}
            >
              <InputDefaultNumber
                key="key"
                id={`ID_${subObjKey}`}
                placeholder={subObjKey}
                onChange={(obj: { value: string }) => {
                  setCountObjDashboard((prev: any) => {
                    const prevObj = structuredClone(prev);

                    prevObj[countObj][subObjKey].count = obj.value;
                    return prevObj;
                  });
                }}
                value={countObjDashboard[countObj][subObjKey].count}
                type="number"
              />
            </InputLayout>
          ))}
        </ColumnDiv>
      ))}
    </>
  );
};

export default InheritedMaterialsCountDesktop;
