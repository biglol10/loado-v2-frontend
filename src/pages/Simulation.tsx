import { useMemo, useState } from 'react';
import {
  ExistingMaterialCountAndMaterialPriceStatusBoard,
  InputLayout,
  InputWithIcon,
  RadioButtonGroup,
} from '@components/index';
import { H3NoMargin, InheritedMaterials } from '@pageStyled/SimulationStyled';
import { getAllItemPrice } from '@services/ItemPriceService';
import { useQuery } from '@tanstack/react-query';
import RefineSetting, { ISimulationResult } from '@components/custom/simulation/RefineSetting';
import { StyledDiv, StyledSpan } from '@consts/appStyled';
import SimulationBarChart from '@components/custom/simulation/SimulationBarChart';
import _ from 'lodash';
import { itemNameAndCountByGroupPerId } from '@consts/requiredRefineMaterials';
import { Icon, Label } from 'semantic-ui-react';
import { Image } from '@components/atoms/image';
import useDeviceType from '@hooks/DeviceTypeHook';
import RefineSettingMobile from '@components/custom/simulation/RefineSettingMobile';
import { ItemGradeType, ItemType } from '@consts/interfaces';
import { LOADO_QUERYKEY } from '@consts/api';

type SimulationResultGroupPointResult = {
  range: string;
  count: number;
};

export type SimulationResultGraphData = {
  simulationResultGroupPointResultList: SimulationResultGroupPointResult[];
  topNPercentPointRange?: SimulationResultGroupPointResult;
};

export interface TargetRefineOption {
  itemGrade: ItemGradeType;
  itemType: ItemType;
}

const Simulation = () => {
  const [countObjDashboard, setCountObjDashboard] = useState(itemNameAndCountByGroupPerId);
  const [simulationResult, setSimulationResult] = useState<ISimulationResult[]>([]);
  const [topNPercentPoint, setTopNPercentPoint] = useState(30);
  const [refineMaterialsMatchOverall, setRefineMaterialsMatchOverall] = useState<any>(null);
  const [simulationCount, setSimulationCount] = useState('1000');
  // const inputRef = useRef<InputHOCRefType>(null);

  const dashboardItemsData = useQuery({
    queryKey: LOADO_QUERYKEY.REFINE_ITEM_PRICE,
    queryFn: getAllItemPrice,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const itemPriceInfoMapping = useMemo(() => {
    if (dashboardItemsData.status === 'success') {
      const itemPriceMapping: {
        [_ in string]: number;
      } = {};

      dashboardItemsData.data.resultArr?.map((item: any) => {
        if (item) {
          const { itemId, currentMinPrice } = item;

          itemPriceMapping[`${itemId}`] = currentMinPrice;
        }
        return null;
      });

      return itemPriceMapping;
    } else return {};
  }, [dashboardItemsData]);

  const [dashboardType, setDashboardType] = useState('count');
  const [targetRefineOption, setTargetRefineOption] = useState<TargetRefineOption>({
    itemGrade: '고대',
    itemType: '무기',
  });

  const graphData = useMemo<SimulationResultGraphData | null>(() => {
    const dataPoints = simulationResult
      .map((item: ISimulationResult) => item.tryCnt)
      .sort((a: number, b: number) => a - b) as number[];

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

    const simulationResultGroupPointResultList = histogramData.map((count, index) => ({
      range:
        max < 25
          ? `${index + 1}`
          : `${Math.floor(min + index * binSize)}-${
              Math.floor(min + (index + 1) * binSize) - (index + 1 === histogramData.length ? 0 : 1)
            }`,
      count,
    }));

    // 상위 30%를 찾는 부분
    if (!topNPercentPoint || topNPercentPoint > 100 || topNPercentPoint < 1)
      return { simulationResultGroupPointResultList };
    const totalDataPoints = dataPoints.length;
    const topNPercentIndex = Math.floor((totalDataPoints * Number(topNPercentPoint)) / 100);

    const topNPercentDatumPoint = dataPoints[topNPercentIndex];
    const topNPercentPointRange = simulationResultGroupPointResultList.find((category) => {
      const rangeValues = category.range.split('-').map(Number);
      const rangeMin = rangeValues[0];
      const rangeMax = rangeValues.length > 1 ? rangeValues[1] : rangeMin;

      return topNPercentDatumPoint >= rangeMin && topNPercentDatumPoint <= rangeMax;
    });

    return { simulationResultGroupPointResultList, topNPercentPointRange };
  }, [simulationResult, topNPercentPoint]);

  const updateRefineMaterialsMatch = (obj: any) => {
    setRefineMaterialsMatchOverall(obj);
  };

  const deviceType = useDeviceType();

  return (
    <StyledDiv paddingBottom="50px">
      <StyledDiv display="flex" alignItems="center" flexWrap="wrap">
        <H3NoMargin isMobile={deviceType === 'mobile'}>※ 재련 시뮬레이션</H3NoMargin>
        <RadioButtonGroup
          options={[
            { label: '귀속재료개수', value: 'count' },
            { label: '재료가격', value: 'price' },
          ]}
          selectedValue={dashboardType}
          onChange={(value: string) => setDashboardType(value)}
        />
      </StyledDiv>
      <br />

      <InheritedMaterials>
        <ExistingMaterialCountAndMaterialPriceStatusBoard
          countObjDashboard={countObjDashboard}
          setCountObjDashboard={setCountObjDashboard}
          countOrPrice={dashboardType}
          itemPriceInfoMapping={itemPriceInfoMapping}
        />
      </InheritedMaterials>

      <br />
      {deviceType !== 'mobile' ? (
        <RefineSetting
          targetRefineOption={targetRefineOption}
          setTargetRefineOption={setTargetRefineOption}
          setSimulationResult={setSimulationResult}
          updateRefineMaterialsMatch={updateRefineMaterialsMatch}
          simulationCount={simulationCount}
          setSimulationCount={setSimulationCount}
        />
      ) : (
        <RefineSettingMobile
          targetRefineOption={targetRefineOption}
          setTargetRefineOption={setTargetRefineOption}
          setSimulationResult={setSimulationResult}
          updateRefineMaterialsMatch={updateRefineMaterialsMatch}
          simulationCount={simulationCount}
          setSimulationCount={setSimulationCount}
        />
      )}

      <br />

      {graphData && graphData.simulationResultGroupPointResultList && simulationResult && (
        <StyledDiv>
          <StyledDiv display="flex" marginLeft={deviceType === 'mobile' ? '0px' : '50px'}>
            <Label style={{ backgroundColor: 'beige' }}>
              <StyledDiv display="flex" justifyContent="center" alignItems="center" gap="20px">
                <Image
                  src={'./assets/images/common/refineAnimation.gif'}
                  imageSize="mini"
                  type="image"
                  // circular
                />
                <StyledSpan color="black">운 상위 N%의 범주</StyledSpan>
                <InputLayout
                  inputLabelSize={'h6'}
                  stretch={false}
                  showInputLabel={false}
                  // spacing={8}
                  inputWidth={'100px'}
                >
                  <InputWithIcon
                    value={`${topNPercentPoint}`}
                    fluid={false}
                    size={'mini'}
                    inputIcon={<Icon name="percent" color="black" />}
                    type="number"
                    onChange={(value) => {
                      setTopNPercentPoint(Number(value));
                    }}
                    // ref={inputRef}
                  />
                </InputLayout>
              </StyledDiv>
            </Label>
          </StyledDiv>

          <br />
          <SimulationBarChart
            graphData={graphData}
            refineMaterialsMatchOverall={refineMaterialsMatchOverall}
            lastRefineResult={simulationResult.find((item) => item.lastRefine)!.memoryArr}
            isFullSoom={refineMaterialsMatchOverall.applyFullSoom}
            isApplyBook={refineMaterialsMatchOverall.applyBook}
            itemsQueryData={
              dashboardItemsData.status === 'success' ? dashboardItemsData.data : null
            }
            countObjDashboard={countObjDashboard}
            topNPercentPoint={topNPercentPoint}
          />
        </StyledDiv>
      )}
    </StyledDiv>
  );
};

export default Simulation;
