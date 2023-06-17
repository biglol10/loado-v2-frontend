import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { TextWithGold } from '@components/atoms/textWithGold';
import { Icon } from 'semantic-ui-react';
import useDeviceType from '@hooks/DeviceTypeHook';
import { IIsMobile } from '@consts/interfaces';
import { IGraphData } from './ItemPriceModal';

interface Props {
  graphData: IGraphData[];
}
interface ActiveSpan {
  active?: boolean;
}

type ActiveInfo = 'minCurrentMinPrice' | 'avgCurrentMinPrice' | 'maxCurrentMinPrice';
type DateOrder = 'desc' | 'asc';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
`;

const StyledTable = styled(Table)<IIsMobile>`
  && {
    border-collapse: collapse;
    color: white;
    background: #04111f;
    width: ${(props) => (props.isMobile ? '100%' : '90%')};
    float: left;
  }
`;

const StyledHead = styled(TableHead)`
  height: 40px;
  position: sticky;
  top: 0;
  background: #04111f;
  z-index: 1;
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
  color: white !important;
  padding: 8px !important;
`;

const StyledLabel = styled.span<ActiveSpan>`
  color: ${(props) => (props.active ? 'orangered' : 'white')};
  cursor: pointer;
`;

const IconStyle = styled(Icon)`
  padding-left: 10px;
  cursor: pointer;
`;

const TableStatistics = (props: Props) => {
  const [activeInfo, setActiveInfo] = useState<ActiveInfo>('minCurrentMinPrice');
  const [dateOrder, setDateOrder] = useState<DateOrder>('desc');
  const deviceType = useDeviceType();

  const graphData = useMemo(() => {
    const sortedData = [...props.graphData];

    if (dateOrder === 'desc') {
      sortedData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (dateOrder === 'asc') {
      sortedData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
    return sortedData;
  }, [props.graphData, dateOrder]);

  return (
    <Wrapper>
      <div>
        <StyledTable isMobile={deviceType === 'mobile'}>
          <StyledHead>
            <StyledCell>
              날짜
              <IconStyle
                name={`caret square ${dateOrder === 'desc' ? 'down' : 'up'}`}
                onClick={() =>
                  setDateOrder((prev) => {
                    if (prev === 'asc') return 'desc';
                    return 'asc';
                  })
                }
              />
            </StyledCell>
            <StyledCell>
              <StyledLabel
                active={activeInfo === 'minCurrentMinPrice'}
                onClick={() => setActiveInfo('minCurrentMinPrice')}
              >
                최소
              </StyledLabel>{' '}
              /{' '}
              <StyledLabel
                active={activeInfo === 'avgCurrentMinPrice'}
                onClick={() => setActiveInfo('avgCurrentMinPrice')}
              >
                평균
              </StyledLabel>{' '}
              /{' '}
              <StyledLabel
                active={activeInfo === 'maxCurrentMinPrice'}
                onClick={() => setActiveInfo('maxCurrentMinPrice')}
              >
                최대
              </StyledLabel>
            </StyledCell>
          </StyledHead>
          <StyledBody>
            {graphData.map((item) => (
              <StyledRow key={`${item._id}`}>
                <StyledCell>{item.date}</StyledCell>
                <StyledCell>
                  <TextWithGold
                    text={`${Math.floor(item[activeInfo]).toLocaleString()}`}
                    width="30px"
                  />
                </StyledCell>
              </StyledRow>
            ))}
          </StyledBody>
        </StyledTable>
      </div>
    </Wrapper>
  );
};

export default TableStatistics;
