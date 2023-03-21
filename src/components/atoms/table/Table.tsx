import styled from 'styled-components';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { loaImages } from '@consts/imgSrc';

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

const StyledSpan = styled.span`
  color: black;
`;

const StyledImage = styled.img`
  vertical-align: inherit;
  width: 40px;
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
          <StyledRow key={d.name}>
            <StyledCell>{d.name}</StyledCell>
            <StyledCell>
              <StyledSpan>{d.averagePrice}</StyledSpan>
              <StyledImage src={loaImages['골드배경X']} />
            </StyledCell>
            <StyledCell>
              <StyledSpan>{d.recentPrice}</StyledSpan>
              <StyledImage src={loaImages['골드배경X']} />
            </StyledCell>
            <StyledCell>
              <StyledSpan>{d.lowestPrice}</StyledSpan>
              <StyledImage src={loaImages['골드배경X']} />
            </StyledCell>
            <StyledCell>{d.getMarketPrice}</StyledCell>
            <StyledCell>{d.bookmark}</StyledCell>
          </StyledRow>
        ))}
      </StyledBody>
    </StyledTable>
  );
};

export { MainTable };
