import { InputDefaultNumber } from '@components/atoms/input';
import { InputLayout, Image } from '@components/index';
import { loaImages, loaImagesType } from '@consts/imgSrc';
import styled from 'styled-components';
import useDeviceType from '@hooks/DeviceTypeHook';
import { IsMobile } from '@consts/interfaces';

interface ColumnDivProps extends IsMobile {
  columns: number;
  columnsMobile: number;
  titleColumns: number;
  titleColumnsMobile: number;
}

const ColumnDiv = styled.div<ColumnDivProps>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  grid-row-gap: ${(props) => (props.isMobile ? '0px' : '15px')};

  @media (max-width: 750px) {
    grid-template-columns: repeat(${(props) => props.columnsMobile}, 1fr);
  }

  .columnDiv_Title {
    grid-column: span ${(props) => props.titleColumns};
    padding: 2px 20px;
    margin: ${(props) => (props.isMobile ? '0 0 20px 0' : '0px')};

    @media (max-width: 750px) {
      grid-column: span ${(props) => props.titleColumnsMobile};
    }
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

const ExistingMaterialCountAndMaterialPriceStatusBoard = ({
  countObjDashboard,
  setCountObjDashboard,
  countOrPrice = 'count',
  itemPriceInfoMapping = {},
}: any) => {
  const categoryTextMapping = {
    bookAndHonorShard: '🛑 명파 + 야금술 (귀속)',
    weaponAndArmorStone: '🛑 강화석 + 명돌 (귀속)',
    accelerantStone: '🛑 특수/융화 재료 (귀속)',
  };

  const deviceType = useDeviceType();

  const columns = deviceType === 'mobile' ? 1 : 3;
  const columnsMobile = deviceType === 'mobile' ? 1 : 2;
  const titleColumns = deviceType === 'mobile' ? 1 : 3;
  const titleColumnsMobile = deviceType === 'mobile' ? 1 : 2;

  return (
    <>
      {Object.keys(countObjDashboard).map((countObj: string) => (
        <ColumnDiv
          key={`columnDiv_${countObj}`}
          columns={columns}
          columnsMobile={columnsMobile}
          titleColumns={titleColumns}
          titleColumnsMobile={titleColumnsMobile}
          isMobile={deviceType === 'mobile'}
        >
          <h3 className="columnDiv_Title">
            {categoryTextMapping[countObj as keyof typeof categoryTextMapping]}
          </h3>
          {Object.keys(countObjDashboard[countObj]).map((subObjKey: string) => (
            <InputLayout
              key={`Input_${subObjKey}`}
              inputLabel={
                <>
                  <Image
                    src={loaImages[countObjDashboard[countObj][subObjKey].name as loaImagesType]}
                    imageSize="mini"
                    type="image"
                    circular={true}
                  />
                  <HeaderSpan>
                    {subObjKey === '66130133'
                      ? '명예의파편 (대)'
                      : countObjDashboard[countObj][subObjKey].name}
                  </HeaderSpan>
                </>
              }
              inputLabelSize={'h5'}
              showInputLabel={true}
              stretch={false}
            >
              <InputDefaultNumber
                key="key"
                id={`ID_${subObjKey}`}
                placeholder={
                  countOrPrice === 'count' ? countObjDashboard[countObj][subObjKey].name : ''
                }
                onChange={(value) => {
                  setCountObjDashboard((prev: any) => {
                    const prevObj = structuredClone(prev);

                    prevObj[countObj][subObjKey].count = value;
                    return prevObj;
                  });
                }}
                value={(() => {
                  if (countOrPrice === 'count') {
                    return countObjDashboard[countObj][subObjKey].count;
                  } else {
                    return itemPriceInfoMapping[subObjKey]?.toLocaleString();
                  }
                })()}
                type="number"
                disabled={countOrPrice === 'price'}
                fluid={true}
                size={'mini'}
              />
            </InputLayout>
          ))}
        </ColumnDiv>
      ))}
    </>
  );
};

export default ExistingMaterialCountAndMaterialPriceStatusBoard;
