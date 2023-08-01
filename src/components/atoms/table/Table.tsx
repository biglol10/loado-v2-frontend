import styled from 'styled-components';
import LaunchIcon from '@mui/icons-material/Launch';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { gradeBackgroundColor, marketItemIdMatch } from '@consts/requiredRefineMaterials';
import { ItemData } from '@pages/ItemPrice';
import { loaImages } from '@consts/imgSrc';
import { StyledDiv } from '@consts/appStyled';
import useDeviceType from '@hooks/DeviceTypeHook';
import useModal from '@hooks/ModalHooks';
import ItemPriceModal from '@components/custom/itemPrice/ItemPriceModal';
import { TextWithGold } from '../textWithGold';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0;
`;

const StyledTable = styled(Table)`
  && {
    border-collapse: collapse;
    border: 1px solid slategrey;
    color: white;
    // background: #04111f;
    background: black;
    margin: 10px;
    width: 95%;
    float: left;
  }
`;

const StyledHead = styled(TableHead)`
  height: 40px;
`;
const StyledBody = styled(TableBody)`
  text-align: center;
`;

const StyledRow = styled(TableRow)`
  border-bottom: 1px solid slategrey;
  height: 40px;
  &:last-child {
    border-bottom: none;
  }
`;

const StyledCell = styled(TableCell)`
  display: inline;
  color: white;
`;

const StyledImage = styled.img`
  vertical-align: inherit;
  width: 30px;
  background: tan;
  border-radius: 50%;
  margin-right: 10px;
`;

const MainTable = ({
  headerTitle,
  columns,
  data,
}: {
  headerTitle: string;
  columns: any;
  data: any;
}) => {
  const formatNumberWithCommasAndFixed1 = (value: number) => {
    const formattedNumber = value.toFixed(1);
    const hasZeroDecimal = formattedNumber.endsWith('.0');
    const finalNumber = hasZeroDecimal ? formattedNumber.replace('.0', '') : formattedNumber;

    return Number(finalNumber).toLocaleString();
  };

  const deviceType = useDeviceType();
  const { showModal } = useModal();

  const showItemPriceModal = (itemId: string, itemName: string) => {
    showModal({
      modalContent: <ItemPriceModal itemId={itemId} itemName={itemName} />,
      modalSize: 'large',
    });
  };

  return (
    <Wrapper>
      <StyledDiv fontWeight={'bold'} fontSize="20px">
        {headerTitle}
      </StyledDiv>
      <div>
        <StyledTable>
          <StyledHead>
            <StyledRow>
              {columns.map((column: string, index: number) => (
                <StyledCell
                  key={index}
                  style={{ color: 'white', padding: '8px', fontWeight: 'bold' }}
                >
                  {column}
                </StyledCell>
              ))}
            </StyledRow>
          </StyledHead>
          <StyledBody>
            {data.map((d: ItemData, i: number) => (
              <StyledRow key={d.recordId}>
                <StyledCell style={{ color: 'white', width: '250px', padding: '8px' }}>
                  <StyledImage
                    src={
                      headerTitle !== '각인서' && headerTitle !== '직업각인서'
                        ? marketItemIdMatch[d.itemId].Icon
                        : loaImages.전설각인서
                    }
                    style={{
                      background: `${
                        gradeBackgroundColor[
                          headerTitle !== '각인서' && headerTitle !== '직업각인서'
                            ? marketItemIdMatch[d.itemId].Grade
                            : '전설'
                        ]
                      }`,
                    }}
                  />
                  {deviceType === 'mobile' ? <div>{d.itemName}</div> : <>{d.itemName}</>}
                </StyledCell>
                {d.minCurrentMinPrice && (
                  <StyledCell style={{ color: 'white', padding: '8px' }}>
                    <TextWithGold
                      text={formatNumberWithCommasAndFixed1(d.minCurrentMinPrice)}
                      width="30px"
                    />
                  </StyledCell>
                )}
                {d.avgCurrentMinPrice && deviceType !== 'mobile' && (
                  <>
                    <StyledCell style={{ color: 'white', padding: '8px' }}>
                      <TextWithGold
                        text={formatNumberWithCommasAndFixed1(d.avgCurrentMinPrice)}
                        width="30px"
                      />
                    </StyledCell>
                    <StyledCell style={{ color: 'white', padding: '8px' }}>
                      <TextWithGold
                        text={formatNumberWithCommasAndFixed1(d.maxCurrentMinPrice)}
                        width="30px"
                      />
                    </StyledCell>
                  </>
                )}

                <StyledCell style={{ color: 'white', padding: '8px' }}>
                  <StyledDiv
                    onClick={() => showItemPriceModal(d.itemId, d.itemName)}
                    style={{ cursor: 'pointer' }}
                  >
                    <MonetizationOnIcon />
                  </StyledDiv>
                </StyledCell>
                {/* <StyledCell style={{ color: 'white', padding: '8px' }}>
                  <LaunchIcon />
                </StyledCell> */}
              </StyledRow>
            ))}
          </StyledBody>
        </StyledTable>
      </div>
    </Wrapper>
  );
};

export { MainTable };
