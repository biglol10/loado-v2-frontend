/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
import { useMemo, useState, useRef } from 'react';
import { InheritedMaterialsCountPriceDesktop, RadioButtonGroup } from '@components/index';
import { H3NoMargin, InheritedMaterials } from '@pageStyled/SimulationStyled';
import { getAllItemPrice } from '@services/ItemPriceService';
import { useQuery } from '@tanstack/react-query';
import RefineSetting, { ISimulationResult } from '@components/custom/simulation/RefineSetting';
import { StyledDiv, StyledHeading } from '@consts/appStyled';
import SimulationBarChart from '@components/custom/simulation/SimulationBarChart';
import _ from 'lodash';
import { simulationObjectDashboard } from '@consts/requiredRefineMaterials';

type ProcessedDataItem = {
  range: string;
  count: number;
};

type GraphDataType = {
  processedData: ProcessedDataItem[];
  top30PercentCategory?: ProcessedDataItem;
};

const Simulation = () => {
  const [countObjDashboard, setCountObjDashboard] = useState(simulationObjectDashboard);
  const [simulationResult, setSimulationResult] = useState<ISimulationResult[]>([]);
  const [topNPercentPoint, setTopNPercentPoint] = useState(30);
  const [refineMaterialsMatchOverall, setRefineMaterialsMatchOverall] = useState<any>(null);

  const itemsQuery = useQuery({
    queryKey: ['itemsPrice'],
    queryFn: getAllItemPrice,
    onSuccess: (data) => {
      console.log('itemsQuery data is');
      console.log(data);
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const itemPriceInfoMapping = useMemo(() => {
    if (itemsQuery.status === 'success') {
      const itemPriceMapping: {
        [_ in string]: number;
      } = {};

      itemsQuery.data.resultArr?.map((item: any) => {
        if (item) {
          const { itemId, currentMinPrice } = item;

          itemPriceMapping[`${itemId}`] = currentMinPrice;
        }
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
    const numBins = max > 180 ? 40 : max > 80 ? 30 : max > 25 ? 20 : max;

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
          : `${Math.floor(min + index * binSize)}-${
              Math.floor(min + (index + 1) * binSize) - (index + 1 === histogramData.length ? 0 : 1)
            }`,
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

    console.log(`top30PercentCategory is ${top30PercentCategory}`);
    console.log(top30PercentCategory);

    return { processedData, top30PercentCategory };
  }, [simulationResult]);

  const updateRefineMaterialsMatch = (obj: any) => {
    setRefineMaterialsMatchOverall(obj);
  };

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
        updateRefineMaterialsMatch={updateRefineMaterialsMatch}
      />

      <br />

      {graphData && graphData.processedData && simulationResult && (
        <SimulationBarChart
          graphData={graphData}
          refineMaterialsMatchOverall={refineMaterialsMatchOverall}
          isFullSoom={simulationResult[0].isFullSoom}
          itemsQueryData={itemsQuery.status === 'success' ? itemsQuery.data : null}
        />
      )}
      <br />
    </StyledDiv>
  );
};

export default Simulation;
