import React, { useState, useEffect, forwardRef, ForwardRefRenderFunction } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPeriodYearMonthItemPrice } from '@services/ItemPriceService';
import useModal from '@hooks/ModalHooks';
import { Image } from '@components/atoms/image';
import { Divider, Dropdown, Button as SemanticButton } from 'semantic-ui-react';
import styled from 'styled-components';
import { ko } from 'date-fns/esm/locale';
import DatePicker from 'react-datepicker';
import { getMonth, getYear } from 'date-fns';
import { Button } from '@components/atoms/button';
import { SharpDivider } from '@components/atoms/sharpDivider';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const ModalTitle = styled.header`
  display: flex;
  justify-content: center;
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

const AA = styled.div`
  background-color: #122437;
  border-radius: 10px;
  box-shadow: 2px 2px 4px rgba(200, 0, 0, 0.8);
  padding: 5px;
  margin-right: 10px;
`;

interface IGraphData {
  _id: string;
  avgCurrentMinPrice: number;
  date: string;
  itemName: string;
  maxCurrentMinPrice: number;
  minCurrentMinPrice: number;
}

const data: IGraphData[] = [
  // Your array of IGraphData objects here
  // Example data:
  {
    _id: '1',
    avgCurrentMinPrice: 10,
    date: '2022-01-01',
    itemName: 'Item A',
    maxCurrentMinPrice: 20,
    minCurrentMinPrice: 5,
  },
  {
    _id: '2',
    avgCurrentMinPrice: 15,
    date: '2022-01-02',
    itemName: 'Item A',
    maxCurrentMinPrice: 25,
    minCurrentMinPrice: 10,
  },
];

const ItemPriceModal = ({ itemName = '원한 각인서' }: { itemName: string }) => {
  const { hideModal } = useModal();
  const [yearValue, setYearValue] = useState<number>(getYear(new Date()));
  const [monthValue, setMonthValue] = useState<number>(getMonth(new Date()));
  const [graphData, setGraphData] = useState<IGraphData[]>([]);

  const itemPriceQuery = useQuery({
    queryKey: ['itemPeriodPrice', itemName, yearValue, monthValue],
    queryFn: () => getPeriodYearMonthItemPrice(itemName, yearValue, monthValue),
    onSuccess: (data) => {
      console.log('itemPeriodPrice data is');
      console.log(data);
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: false, // Disable the query initially
  });

  if (itemPriceQuery.status === 'error') {
    alert('에러가 발생했습니다');
    hideModal();
    return null;
  }

  const searchClick = async () => {
    try {
      const data = (await itemPriceQuery.refetch()) as unknown as IGraphData[];

      setGraphData(data);

      console.log(data);
    } catch (error) {
      console.error('Error occurred while fetching data:', error);
      alert('에러가 발생했습니다');
    }
  };

  return (
    <div>
      <ModalTitle>
        <h2 style={{ color: 'gold' }}>거래소 시세 확인</h2>
      </ModalTitle>
      {/* <Divider /> */}
      <SharpDivider dividerColor="orange" />
      <ViewCondition>
        <div>
          <AA>
            <Image
              src={'./assets/images/items/명예의파편.webp'}
              imageSize="mini"
              type="image"
              circular
            />
          </AA>

          <h2>파괴강석</h2>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
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
        </div>

        {/* <StyledDatePicker label={'"month" and "year"'} views={['month', 'year']} /> */}
      </ViewCondition>
      <br />
      <Divider />
      <br />

      {graphData && graphData.length > 0 && (
        <div style={{ width: '100%', height: 300 }}>
          <span>sadf</span>
        </div>
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default ItemPriceModal;
