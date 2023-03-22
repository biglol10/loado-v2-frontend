import styled from 'styled-components';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { TextWithGold } from '../textWithGold';

const StyledTable = styled(Table)`
  && {
    border-collapse: collapse;
    border: 1px solid white;
    background: white;
    margin: 10px;
    width: 48%;
    float: left;
  }
`;

const StyledHead = styled(TableHead)`
  border-bottom: 1px solid white;
  height: 40px;
`;
const StyledBody = styled(TableBody)`
  text-align: center;
`;
const StyledRow = styled(TableRow)`
  border-bottom: 1px solid white;
  height: 40px;
  &:last-child {
    border-bottom: none;
  }
`;

const StyledCell = styled(TableCell)`
  display: inline;
`;

const StyledImage = styled.img`
  vertical-align: inherit;
  width: 30px;
`;

const MainTable = ({ columns, data }: { columns: any; data: any }) => {
  return (
    <StyledTable>
      <StyledHead>
        <StyledRow>
          {columns.map((column: string, index: number) => (
            <StyledCell key={index}>{column}</StyledCell>
          ))}
        </StyledRow>
      </StyledHead>
      <StyledBody>
        {data.map((d: any, i: number) => (
          <StyledRow key={d.Id}>
            <StyledCell>
              <StyledImage src={d.Icon} />
              {d.Name}
            </StyledCell>
            {d.YDayAvgPrice && (
              <StyledCell>
                <TextWithGold text={d.YDayAvgPrice} width="30px" />
              </StyledCell>
            )}
            {d.RecentPrice && (
              <StyledCell>
                <TextWithGold text={d.RecentPrice} width="30px" />
              </StyledCell>
            )}
            <StyledCell>
              <TextWithGold text={d.CurrentMinPrice} width="30px" />
            </StyledCell>
            <StyledCell>Icon</StyledCell>
            <StyledCell>Icon</StyledCell>
          </StyledRow>
        ))}
      </StyledBody>
    </StyledTable>
  );
};

export { MainTable };
