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
    item1: {
      value: '',
      isError: false,
    },
    item2: {
      value: '',
      isError: false,
    },
    item3: {
      value: '',
      isError: false,
    },
    item4: {
      value: '',
      isError: false,
    },
    item5: {
      value: '',
      isError: false,
    },
  });

  return (
    <div>
      <h3>※ 제련 시뮬레이션</h3>
      <InheritedMaterials>
        <ColumnDiv>
          <h3 className="columnDiv_Title">🛑 명파 + 야금술 (귀속)</h3>
          <InputLayout
            inputLabel={
              <>
                <Image
                  src={loaImages['명예의파편']}
                  imageSize="mini"
                  type="image"
                  circular={true}
                />
                <HeaderSpan>명예의 파편</HeaderSpan>
              </>
            }
            inputLabelSize={'h5'}
            showInputLabel={true}
            stretch={false}
            error={categoryObj1.item1.isError}
          >
            <InputDefaultNumber
              key="key"
              id="InputDefault2"
              // type="number"
              placeholder="명예의 파편"
              onChange={(obj: { value: string }) => {
                setCategoryObj1((prev: any) => ({
                  ...prev,
                  item1: {
                    value: obj.value,
                  },
                }));
              }}
              value={categoryObj1.item1}
              type="number"
            />
          </InputLayout>
          <InputLayout
            errorMsg="올바르지 않은 글자가 포함되어 있습니다11"
            inputLabel={
              <>
                <Image
                  src={loaImages['야금술특화']}
                  imageSize="mini"
                  type="image"
                  circular={true}
                />
                <HeaderSpan>야금술 특화</HeaderSpan>
              </>
            }
            inputLabelSize={'h5'}
            showInputLabel={true}
            stretch={false}
            error={categoryObj1.item2.isError}
          >
            <InputDefaultNumber
              key="key"
              id="InputDefault2"
              // type="number"
              placeholder="야금술 특화"
              onChange={(obj: { value: string }) => {
                setCategoryObj1((prev: any) => ({
                  ...prev,
                  item2: {
                    value: obj.value,
                  },
                }));
              }}
              value={categoryObj1.item2}
              type="number"
            />
          </InputLayout>
          <InputLayout
            errorMsg="올바르지 않은 글자가 포함되어 있습니다11"
            inputLabel={
              <>
                <Image
                  src={loaImages['재봉술특화']}
                  imageSize="mini"
                  type="image"
                  circular={true}
                />
                <HeaderSpan>재봉술 특화</HeaderSpan>
              </>
            }
            inputLabelSize={'h5'}
            showInputLabel={true}
            stretch={false}
            error={categoryObj1.item3.isError}
          >
            <InputDefaultNumber
              key="key"
              id="InputDefault3"
              // type="number"
              placeholder="재봉술 특화"
              onChange={(obj: { value: string }) => {
                setCategoryObj1((prev: any) => ({
                  ...prev,
                  item3: {
                    value: obj.value,
                  },
                }));
              }}
              value={categoryObj1.item3}
              type="number"
            />
          </InputLayout>
          <InputLayout
            errorMsg="올바르지 않은 글자가 포함되어 있습니다11"
            inputLabel={
              <>
                <Image
                  src={loaImages['야금술숙련']}
                  imageSize="mini"
                  type="image"
                  circular={true}
                />
                <HeaderSpan>야금술 숙련</HeaderSpan>
              </>
            }
            inputLabelSize={'h5'}
            showInputLabel={true}
            stretch={false}
            error={categoryObj1.item4.isError}
          >
            <InputDefaultNumber
              key="key"
              id="InputDefault2"
              // type="number"
              placeholder="야금술 숙련"
              onChange={(obj: { value: string }) => {
                setCategoryObj1((prev: any) => ({
                  ...prev,
                  item4: {
                    value: obj.value,
                  },
                }));
              }}
              value={categoryObj1.item4}
              type="number"
            />
          </InputLayout>
          <InputLayout
            errorMsg="올바르지 않은 글자가 포함되어 있습니다11"
            inputLabel={
              <>
                <Image
                  src={loaImages['재봉술숙련']}
                  imageSize="mini"
                  type="image"
                  circular={true}
                />
                <HeaderSpan>재봉술 숙련</HeaderSpan>
              </>
            }
            inputLabelSize={'h5'}
            showInputLabel={true}
            stretch={false}
            error={categoryObj1.item5.isError}
          >
            <InputDefaultNumber
              key="key"
              id="InputDefault2"
              // type="number"
              placeholder="재봉술 숙련"
              onChange={(obj: { value: string }) => {
                setCategoryObj1((prev: any) => ({
                  ...prev,
                  item5: {
                    value: obj.value,
                  },
                }));
              }}
              value={categoryObj1.item5}
              type="number"
            />
          </InputLayout>
        </ColumnDiv>
        <ColumnDiv>
          <h3 className="columnDiv_Title">🛑 강화석 + 융화제 (귀속)</h3>
        </ColumnDiv>
        <div>asdf3</div>
      </InheritedMaterials>
    </div>
  );
};

export default Simulation;
