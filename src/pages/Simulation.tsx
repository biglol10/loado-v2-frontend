import { useState, useEffect, useMemo } from 'react';
import { InputDefaultNumber } from '@components/atoms/input';
import Tooltip from '@components/atoms/tooltip/Tooltip';
import {
  InputDefault,
  InputLayout,
  Image,
  InheritedMaterialsCountPriceDesktop,
  RadioButtonGroup,
} from '@components/index';
import { loaImages } from '@consts/imgSrc';
import styled from 'styled-components';
import { itemNameMatch, itemNameArr } from '@consts/itemNameMatch';
import { useQuery, useQueries } from '@tanstack/react-query';
import { getSingleItemPrice, getAllItemPrice } from '@services/ItemPriceService';

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

const H3NoMargin = styled.h3`
  margin-bottom: 0px;
  margin-right: 20px;
`;

// height: 250px;
// overflow-y: auto;

const Simulation = () => {
  const [countObjDashboard, setCountObjDashboard] = useState({
    categoryObj1: {
      명예의파편: {
        id: 66130133,
        count: '',
        price: '',
      },
      야금술특화: {
        id: 66112532,
        count: '',
        price: '',
      },
      재봉술특화: {
        id: 66112535,
        count: '',
        price: '',
      },
      야금술숙련: {
        id: 66112531,
        count: '',
        price: '',
      },
      재봉술숙련: {
        id: 66112534,
        count: '',
        price: '',
      },
    },
    categoryObj2: {
      파괴강석: {
        id: 66102004,
        count: '',
        price: '',
      },
      수호강석: {
        id: 66102104,
        count: '',
        price: '',
      },
      경명돌: {
        id: 66110223,
        count: '',
        price: '',
      },
      정제된파괴강석: {
        id: 66102005,
        count: '',
        price: '',
      },
      정제된수호강석: {
        id: 66102105,
        count: '',
        price: '',
      },
      찬명돌: {
        id: 66110224,
        count: '',
        price: '',
      },
    },
    categoryObj3: {
      태양의은총: {
        id: 66111121,
        count: '',
        price: '',
      },
      태양의축복: {
        id: 66111122,
        count: '',
        price: '',
      },
      태양의가호: {
        id: 66111123,
        count: '',
        price: '',
      },
      상급오레하: {
        id: 6861009,
        count: '',
        price: '',
      },
      최상급오레하: {
        id: 6861011,
        count: '',
        price: '',
      },
    },
  });

  const itemsQuery = useQuery({
    queryKey: ['itemsPrice'],
    queryFn: getAllItemPrice,
    onSuccess: (data) => {
      console.log('came to onSuccess and data is');
      console.log(data);
    },
    staleTime: 1000 * 3600,
  });

  console.log(itemsQuery);

  const itemPriceInfoMapping = useMemo(() => {
    if (itemsQuery.status === 'success') {
      const itemPriceMapping: {
        [x in string]: number;
      } = {};

      itemsQuery.data.map(({ Id, Name, CurrentMinPrice, Icon }: any) => {
        itemPriceMapping[`${Id}`] = CurrentMinPrice;
        return null;
      });

      return itemPriceMapping;
    } else return {};
  }, [itemsQuery]);

  const [selectedValue, setSelectedValue] = useState('count');

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <H3NoMargin>※ 제련 시뮬레이션</H3NoMargin>
        <RadioButtonGroup
          options={[
            { label: '귀속재료개수', value: 'count' },
            { label: '재료가격', value: 'price' },
          ]}
          selectedValue={selectedValue}
          onChange={(value: any) => setSelectedValue(value)}
        />
      </div>
      <br />

      <InheritedMaterials>
        <InheritedMaterialsCountPriceDesktop
          countObjDashboard={countObjDashboard}
          setCountObjDashboard={setCountObjDashboard}
          countOrPrice={selectedValue}
          itemPriceInfoMapping={itemPriceInfoMapping}
        />
      </InheritedMaterials>
    </div>
  );
};

export default Simulation;
