import styled from 'styled-components';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { TextWithGold } from '../textWithGold';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTable = styled(Table)`
  && {
    border-collapse: collapse;
    border: 1px solid slategrey;
    color: white;
    background: #04111f;
    margin: 10px;
    width: 48%;
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
  return (
    <Wrapper>
      <div>{headerTitle}</div>
      <div>
        <StyledTable>
          <StyledHead>
            <StyledRow>
              {columns.map((column: string, index: number) => (
                <StyledCell key={index} style={{ color: 'white', padding: '8px' }}>
                  {column}
                </StyledCell>
              ))}
            </StyledRow>
          </StyledHead>
          <StyledBody>
            {data.map((d: any, i: number) => (
              <StyledRow key={d.Id}>
                <StyledCell style={{ color: 'white', padding: '8px' }}>
                  <StyledImage src={d.Icon} />
                  {d.itemName}
                </StyledCell>
                {d.yDayAvgPrice && (
                  <StyledCell style={{ color: 'white', padding: '8px' }}>
                    <TextWithGold text={d.yDayAvgPrice} width="30px" />
                  </StyledCell>
                )}
                {d.recentPrice && (
                  <StyledCell style={{ color: 'white', padding: '8px' }}>
                    <TextWithGold text={d.recentPrice} width="30px" />
                  </StyledCell>
                )}
                <StyledCell style={{ color: 'white', padding: '8px' }}>
                  <TextWithGold text={d.currentMinPrice} width="30px" />
                </StyledCell>
                <StyledCell style={{ color: 'white', padding: '8px' }}>Icon</StyledCell>
                <StyledCell style={{ color: 'white', padding: '8px' }}>Icon</StyledCell>
              </StyledRow>
            ))}
          </StyledBody>
        </StyledTable>
      </div>
    </Wrapper>
  );
};

export { MainTable };
