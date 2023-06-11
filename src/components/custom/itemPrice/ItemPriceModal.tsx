import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPeriodYearMonthItemPrice } from '@services/ItemPriceService';
import useModal from '@hooks/ModalHooks';
import { Image } from '@components/atoms/image';
import { Divider, Dropdown, Button as SemanticButton } from 'semantic-ui-react';
import styled from 'styled-components';
import { getMonth, getYear } from 'date-fns';
import { Button } from '@components/atoms/button';
import { SharpDivider } from '@components/atoms/sharpDivider';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
} from 'recharts';
import { loaImages } from '@consts/imgSrc';
import { toast } from 'react-toastify';
import { StyledDiv } from '@consts/appStyled';
import useDeviceType from '@hooks/DeviceTypeHook';
import TableStatistics from './TableStatistics';
import CustomTooltip from './CustomTooltip';

const ModalTitle = styled.header`
  display: flex;
  justify-content: center;
  > h2 {
    color: gold;
    font-style: italic;
  }
`;

const ViewCondition = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  > div {
    display: flex;
    align-items: center;

    h2 {
      margin-top: 0px;
    }
  }
`;

const yearOptions = [
  { key: 'year_2023', text: '2023년', value: 2023 },
  { key: 'year_2024', text: '2024년', value: 2024 },
];

const monthOptions = Array.from({ length: 12 }, (_, i) => ({
  key: `month_${i + 1}`,
  text: `${i + 1}월`,
  value: i + 1,
}));

const ItemImageDiv = styled.div`
  background-color: #122437;
  border-radius: 10px;
  box-shadow: 2px 2px 4px rgba(200, 0, 0, 0.8);
  padding: 5px;
  margin-right: 10px;
`;

interface TooltipKeyProps {
  color?: string;
}

const StyledLabel = styled.span<TooltipKeyProps>`
  font-style: italic;
  color: ${(props) => props.color};
`;

export interface IGraphData {
  _id: string;
  avgCurrentMinPrice: number;
  date: string;
  itemName: string;
  maxCurrentMinPrice: number;
  minCurrentMinPrice: number;
}

export const colorMapping = {
  maxCurrentMinPrice: '#4565FF',
  avgCurrentMinPrice: '#ff7300',
  minCurrentMinPrice: '#ECB32B',
};

const ItemPriceModal = ({
  itemId = '65200504',
  itemName = '원한 각인서',
}: {
  itemId: string;
  itemName: string;
}) => {
  const { hideModal } = useModal();
  const [yearValue, setYearValue] = useState<number>(getYear(new Date()));
  const [monthValue, setMonthValue] = useState<number>(getMonth(new Date()));
  const deviceType = useDeviceType();

  const itemPriceQuery = useQuery<IGraphData[]>({
    queryKey: ['itemPeriodPrice', itemId, yearValue, monthValue],
    queryFn: () => getPeriodYearMonthItemPrice(itemId, yearValue, monthValue),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  if (itemPriceQuery.status === 'error') {
    toast.error(<StyledDiv color="black">데이터를 가져오지 못했습니다</StyledDiv>, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
    });
    hideModal();
    return null;
  }

  const searchClick = async () => {
    try {
      await itemPriceQuery.refetch();
    } catch (error) {
      toast.error(<StyledDiv color="black">데이터를 가져오지 못했습니다</StyledDiv>, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
    }
  };

  return (
    <div>
      <ModalTitle>
        <h2>거래소 시세 확인</h2>
      </ModalTitle>
      <SharpDivider dividerColor="orange" />
      <ViewCondition>
        <div>
          <ItemImageDiv>
            <Image src={loaImages['전설각인서']} imageSize="mini" type="image" circular />
          </ItemImageDiv>

          <h2>{itemName}</h2>
        </div>
        <StyledDiv display="flex" gap="20px">
          <SemanticButton.Group color="grey" inverted size="mini">
            <SemanticButton>{yearValue}년</SemanticButton>
            <Dropdown
              className="button icon"
              floating
              options={yearOptions}
              trigger={<></>}
              value={yearValue}
              onChange={(_, data) => {
                setYearValue(data.value as number);
              }}
            />
          </SemanticButton.Group>
          <SemanticButton.Group color="grey" inverted size="mini">
            <SemanticButton>{monthValue}월</SemanticButton>
            <Dropdown
              className="button icon"
              floating
              options={monthOptions}
              trigger={<></>}
              value={monthValue}
              onChange={(_, data) => {
                setMonthValue(data.value as number);
              }}
            />
          </SemanticButton.Group>
          <div style={{ width: '100px', marginLeft: '100px' }}>
            <Button content={'조회'} basic size="mini" inverted onClick={searchClick} />
          </div>
        </StyledDiv>
      </ViewCondition>
      <br />
      <Divider />
      <br />

      {itemPriceQuery && itemPriceQuery.data && itemPriceQuery.data.length > 0 && (
        <StyledDiv display="grid" gridTemplateColumns="70% 30%" gap="20px">
          <ResponsiveContainer width={deviceType !== 'mobile' ? '100%' : '100%'} height={500}>
            <ComposedChart data={itemPriceQuery.data}>
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="date" scale="band" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                payload={[
                  {
                    value: (
                      <StyledLabel color={colorMapping.avgCurrentMinPrice}>평균가격</StyledLabel>
                    ),
                    type: 'rect',
                    color: colorMapping.avgCurrentMinPrice,
                  },
                  {
                    value: (
                      <StyledLabel color={colorMapping.minCurrentMinPrice}>최소가격</StyledLabel>
                    ),
                    type: 'line',
                    color: colorMapping.minCurrentMinPrice,
                  },
                  {
                    value: (
                      <StyledLabel color={colorMapping.maxCurrentMinPrice}>최대가격</StyledLabel>
                    ),
                    type: 'rect',
                    color: colorMapping.maxCurrentMinPrice,
                  },
                ]}
              />
              {/* <Area type="monotone" dataKey="avgCurrentMinPrice" fill="#8884d8" stroke="#8884d8" /> */}
              <Bar
                dataKey="minCurrentMinPrice"
                barSize={16}
                fill={colorMapping.minCurrentMinPrice}
              />
              <Line
                type="monotone"
                dataKey="avgCurrentMinPrice"
                stroke={colorMapping.avgCurrentMinPrice}
              />
              <Scatter dataKey="maxCurrentMinPrice" fill={colorMapping.maxCurrentMinPrice} />
            </ComposedChart>
          </ResponsiveContainer>
          <StyledDiv height="500px" width="100%">
            {itemPriceQuery && itemPriceQuery.data && itemPriceQuery.data.length > 0 && (
              <TableStatistics graphData={itemPriceQuery.data} />
            )}
          </StyledDiv>
        </StyledDiv>
      )}
    </div>
  );
};

export default ItemPriceModal;
