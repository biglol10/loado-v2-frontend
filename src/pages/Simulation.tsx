/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
import React, { useMemo, useState } from 'react';
import { InheritedMaterialsCountPriceDesktop, RadioButtonGroup } from '@components/index';
import { H3NoMargin, InheritedMaterials } from '@pageStyled/SimulationStyled';
import { getAllItemPrice } from '@services/ItemPriceService';
import { useQuery } from '@tanstack/react-query';
import RefineSetting, { ISimulationResult } from '@components/custom/simulation/RefineSetting';
import { StyledDiv } from '@consts/appStyled';
import SimulationBarChart from '@components/custom/simulation/SimulationBarChart';
import _ from 'lodash';

type ProcessedDataItem = {
  range: string;
  count: number;
};

type GraphDataType = {
  processedData: ProcessedDataItem[];
  top30PercentCategory?: ProcessedDataItem;
};

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

  const [simulationResult, setSimulationResult] = useState<ISimulationResult[]>([]);

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
        [_ in string]: number;
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

  const graphData = useMemo<GraphDataType | null>(() => {
    const dataPoints = simulationResult
      .map((item: ISimulationResult) => item.tryCnt)
      .sort((a: Number, b: Number) => (a as number) - (b as number)) as number[];

    if (_.isEmpty(dataPoints)) return null;

    const min = Math.min(...dataPoints);
    const max = Math.max(...dataPoints);
    const numBins = max > 80 ? 30 : max > 25 ? 20 : max;

    const binSize = (max - min) / numBins;

    const histogramData = new Array(numBins).fill(0);

    dataPoints.forEach((value: number) => {
      const binIndex = Math.min(Math.floor((value - min) / binSize), numBins - 1);

      histogramData[binIndex] += 1;
    });

    const processedData = histogramData.map((count, index) => ({
      range:
        max < 25
          ? `${index + 1}`
          : `${Math.floor(min + index * binSize)}-${Math.floor(min + (index + 1) * binSize) - 1}`,
      count,
    }));

    // 상위 30%를 찾는 부분
    const totalDataPoints = dataPoints.length;
    const top30PercentIndex = Math.floor(totalDataPoints * 0.3);

    const top30PercentValue = dataPoints[top30PercentIndex];
    const top30PercentCategory = processedData.find((category) => {
      const rangeValues = category.range.split('-').map(Number);
      const rangeMin = rangeValues[0];
      const rangeMax = rangeValues.length > 1 ? rangeValues[1] : rangeMin;

      return top30PercentValue >= rangeMin && top30PercentValue <= rangeMax;
    });

    console.log(top30PercentCategory);

    return { processedData, top30PercentCategory };
  }, [simulationResult]);

  return (
    <StyledDiv>
      <StyledDiv display="flex" alignItems="center">
        <H3NoMargin>※ 재련 시뮬레이션</H3NoMargin>
        <RadioButtonGroup
          options={[
            { label: '귀속재료개수', value: 'count' },
            { label: '재료가격', value: 'price' },
          ]}
          selectedValue={selectedValue}
          onChange={(value: string) => setSelectedValue(value)}
        />
      </StyledDiv>
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
        setSimulationResult={setSimulationResult}
      />

      <br />

      {graphData && graphData.processedData && <SimulationBarChart graphData={graphData} />}
      <br />
    </StyledDiv>
  );
};

export default Simulation;
