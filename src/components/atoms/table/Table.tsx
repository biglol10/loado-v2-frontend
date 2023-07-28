import styled from 'styled-components';
import LaunchIcon from '@mui/icons-material/Launch';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { gradeBackgroundColor, marketItemIdMatch } from '@consts/requiredRefineMaterials';
import { Image } from '@components/atoms/image';
import { ActiveTabType } from '@pages/ItemPrice';
import { loaImages } from '@consts/imgSrc';
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
    // background: #04111f;
    background: black;
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
  background: tan;
  border-radius: 50%;
  margin-right: 10px;
`;

interface ItemData {
  recordId: string;
  itemName: string;
  itemId: string;
  categoryCode: number;
  date: string;
  minCurrentMinPrice: number;
  maxCurrentMinPrice: number;
  avgCurrentMinPrice: number;
}

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
            {data.map((d: ItemData, i: number) => (
              <StyledRow key={d.recordId}>
                <StyledCell style={{ color: 'white', padding: '8px' }}>
                  <StyledImage
                    src={
                      headerTitle !== '각인서'
                        ? marketItemIdMatch[d.itemId].Icon
                        : loaImages.전설각인서
                    }
                    style={{
                      background: `${
                        gradeBackgroundColor[
                          headerTitle !== '각인서' ? marketItemIdMatch[d.itemId].Grade : '전설'
                        ]
                      }`,
                    }}
                  />
                  {/* <Image
                    src={marketItemIdMatch[d.itemId].Icon}
                    imageSize="mini"
                    type="image"
                    circular
                  /> */}
                  {d.itemName}
                </StyledCell>
                {d.minCurrentMinPrice && (
                  <StyledCell style={{ color: 'white', padding: '8px' }}>
                    <TextWithGold text={`${d.minCurrentMinPrice}`} width="30px" />
                  </StyledCell>
                )}
                {d.avgCurrentMinPrice && (
                  <StyledCell style={{ color: 'white', padding: '8px' }}>
                    <TextWithGold text={`${d.avgCurrentMinPrice}`} width="30px" />
                  </StyledCell>
                )}
                <StyledCell style={{ color: 'white', padding: '8px' }}>
                  <TextWithGold text={`${d.maxCurrentMinPrice}`} width="30px" />
                </StyledCell>
                <StyledCell style={{ color: 'white', padding: '8px' }}>
                  <MonetizationOnIcon />
                </StyledCell>
                <StyledCell style={{ color: 'white', padding: '8px' }}>
                  <LaunchIcon />
                </StyledCell>
              </StyledRow>
            ))}
          </StyledBody>
        </StyledTable>
      </div>
    </Wrapper>
  );
};

export { MainTable };
