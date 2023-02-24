import { useEffect, useMemo, useState } from 'react';
// import { InputDefaultNumber } from '@components/atoms/input';
import Tooltip from '@components/atoms/tooltip/Tooltip';
import {
  Image,
  InheritedMaterialsCountPriceDesktop,
  InputDefault,
  InputDropdown,
  InputLayout,
  Label,
  RadioButtonGroup,
  InputDefaultNumber,
} from '@components/index';
import { loaImages } from '@consts/imgSrc';
import { itemNameArr, itemNameMatch } from '@consts/itemNameMatch';
import { H3NoMargin, InheritedMaterials, RefineSettingDiv } from '@pageStyled/SimulationStyled';
import { getAllItemPrice } from '@services/ItemPriceService';
import { useQuery } from '@tanstack/react-query';
import RefineSetting from '@components/custom/simulation/RefineSetting';
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
  const [selectOptionParam, setSelectOptionParam] = useState({
    option1: '아브노말',
    option2: '무기',
  });

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <H3NoMargin>※ 재련 시뮬레이션</H3NoMargin>
        <RadioButtonGroup
          options={[
            { label: '귀속재료개수', value: 'count' },
            { label: '재료가격', value: 'price' },
          ]}
          selectedValue={selectedValue}
          onChange={(value: string) => setSelectedValue(value)}
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

      <br />
      <RefineSetting
        selectOptionParam={selectOptionParam}
        setSelectOptionParam={setSelectOptionParam}
      />
    </div>
  );
};

export default Simulation;
