import React, { ReactNode, useMemo } from 'react';
import { StyledDiv, StyledSpan } from '@consts/appStyled';
import {
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ReferenceLine,
  TooltipProps,
  ResponsiveContainer,
} from 'recharts';
import { Image } from '@components/atoms/image';
import { Divider } from 'semantic-ui-react';
import { loaImages } from '@consts/imgSrc';
import useDeviceType from '@hooks/DeviceTypeHook';
import styled from 'styled-components';
import { isEqual } from 'lodash';
import { SimulationResultGraphData } from '@pages/Simulation';

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const StyledMobileToolDiv = styled.div`
  display: flex;
  flex-wrap: wrap;

  div {
    margin: 2px;
  }
`;

const TooltipContentDiv = ({ children }: { children: ReactNode }) => {
  const deviceType = useDeviceType();

  if (deviceType === 'mobile') {
    return <StyledMobileToolDiv>{children}</StyledMobileToolDiv>;
  }
  return (
    <StyledDiv display="grid" gridTemplateColumns="1fr 1fr" gap="2px">
      {children}
    </StyledDiv>
  );
};

const SimulationBarChart = ({
  graphData,
  refineMaterialsMatchOverall,
  isFullSoom,
  isApplyBook,
  itemsQueryData,
  countObjDashboard,
  lastRefineResult,
  topNPercentPoint,
}: {
  graphData: SimulationResultGraphData;
  refineMaterialsMatchOverall: any;
  isFullSoom: Boolean;
  isApplyBook: Boolean;
  itemsQueryData: {
    result: String;
    resultArr: { itemId: String; itemName: String; currentMinPrice: number }[];
  };
  countObjDashboard: any;
  lastRefineResult: {
    successProb: Number;
    artisanEnergy: Number | String;
    tryCnt: Number;
    startProb: Number;
  }[];
  topNPercentPoint: Number;
}) => {
  const countObjDashboardSpread = useMemo(() => {
    return {
      ...countObjDashboard.bookAndHonorShard,
      ...countObjDashboard.weaponAndArmorStone,
      ...countObjDashboard.accelerantStone,
    };
  }, [countObjDashboard]);

  const CustomTooltip: React.FC<CustomTooltipProps> = React.memo(
    ({ active, payload, label }: any) => {
      const {
        weaponOrArmour,
        leapstoneId,
        fusionMaterialId,
        gold,
        honorShard,
        requiredSteelCount,
        requiredLeapStoneCount,
        requiredFusionMaterialCount,
      } = refineMaterialsMatchOverall;

      const goldJanggiSummary = useMemo(() => {
        if (!label) return 0;
        const labelArr = label.split('-');
        const refineStoneId = refineMaterialsMatchOverall[`${weaponOrArmour}StoneId`];

        const priceToGetList = [
          { id: refineStoneId, count: requiredSteelCount, bundleCount: 10, extraMultiplier: 1 },
          { id: leapstoneId, count: requiredLeapStoneCount, bundleCount: 1, extraMultiplier: 1 },
          {
            id: fusionMaterialId,
            count: requiredFusionMaterialCount,
            bundleCount: 1,
            extraMultiplier: 1,
          },
          { id: '66130133', count: 1, bundleCount: 1500, extraMultiplier: honorShard },
        ];

        if (isFullSoom) {
          priceToGetList.push({
            id: '66111121',
            count: refineMaterialsMatchOverall['태양의은총'],
            bundleCount: 1,
            extraMultiplier: 1,
          });
          priceToGetList.push({
            id: '66111122',
            count: refineMaterialsMatchOverall['태양의축복'],
            bundleCount: 1,
            extraMultiplier: 1,
          });
          priceToGetList.push({
            id: '66111123',
            count: refineMaterialsMatchOverall['태양의가호'],
            bundleCount: 1,
            extraMultiplier: 1,
          });
        }

        if (
          isApplyBook &&
          Object.prototype.hasOwnProperty.call(refineMaterialsMatchOverall, 'bookProb')
        ) {
          priceToGetList.push({
            id: refineMaterialsMatchOverall.bookProb.bookId,
            count: 1,
            bundleCount: 1,
            extraMultiplier: 1,
          });
        }

        let totalGold1 = 0;
        let totalGold2 = 0;
        let totalGoldAnother1 = 0;
        let totalGoldAnother2 = 0;
        let janggi1 = '';
        let janggi2 = '';

        for (const itemObj of priceToGetList) {
          const currentMinPrice = itemsQueryData.resultArr.find(
            (itemQuery) => itemQuery.itemId === itemObj.id,
          )?.currentMinPrice;

          if (currentMinPrice) {
            totalGold1 += Math.ceil(
              (currentMinPrice * labelArr[0] * itemObj.count * itemObj.extraMultiplier) /
                itemObj.bundleCount,
            );
            const itemCostCount1 =
              labelArr[0] * itemObj.count * itemObj.extraMultiplier -
                (countObjDashboardSpread[itemObj.id].count
                  ? countObjDashboardSpread[itemObj.id].count.replace(/,/g, '')
                  : 0) >
              0
                ? labelArr[0] * itemObj.count * itemObj.extraMultiplier -
                  (countObjDashboardSpread[itemObj.id].count
                    ? countObjDashboardSpread[itemObj.id].count.replace(/,/g, '')
                    : 0)
                : 0;

            totalGoldAnother1 += Math.ceil(
              (currentMinPrice * itemCostCount1) / itemObj.bundleCount,
            );
            if (labelArr.length > 1) {
              totalGold2 += Math.ceil(
                (currentMinPrice * labelArr[1] * itemObj.count * itemObj.extraMultiplier) /
                  itemObj.bundleCount,
              );
              const itemCostCount2 =
                labelArr[1] * itemObj.count * itemObj.extraMultiplier -
                  (countObjDashboardSpread[itemObj.id].count
                    ? countObjDashboardSpread[itemObj.id].count.replace(/,/g, '')
                    : 0) >
                0
                  ? labelArr[1] * itemObj.count * itemObj.extraMultiplier -
                    (countObjDashboardSpread[itemObj.id].count
                      ? countObjDashboardSpread[itemObj.id].count.replace(/,/g, '')
                      : 0)
                  : 0;

              totalGoldAnother2 += Math.ceil(
                (currentMinPrice * itemCostCount2) / itemObj.bundleCount,
              );
            }
          }
        }

        if (labelArr.length > 1) {
          totalGold1 += labelArr[0] * gold;
          totalGold2 += labelArr[1] * gold;
          totalGoldAnother1 += labelArr[0] * gold;
          totalGoldAnother2 += labelArr[1] * gold;
          janggi1 = lastRefineResult[
            labelArr[0] - 1 < lastRefineResult.length - 1
              ? labelArr[0] - 1
              : lastRefineResult.length - 1
          ].artisanEnergy as string;
          janggi2 = lastRefineResult[
            labelArr[1] - 1 < lastRefineResult.length - 1
              ? labelArr[1] - 1
              : lastRefineResult.length - 1
          ].artisanEnergy as string;
          return {
            totalGold: (
              <>
                <StyledSpan marginLeft="2px">합계: {totalGold1.toLocaleString()}</StyledSpan>~
                <StyledSpan>{totalGold2.toLocaleString()}</StyledSpan>
              </>
            ),
            totalGoldAnother: (
              <>
                <StyledSpan marginLeft="2px">
                  귀속O: {totalGoldAnother1.toLocaleString()}
                </StyledSpan>
                ~<StyledSpan>{totalGoldAnother2.toLocaleString()}</StyledSpan>
              </>
            ),
            jangi: (
              <>
                <StyledSpan marginLeft="2px">{janggi1}</StyledSpan>~
                <StyledSpan>{janggi2}</StyledSpan>
              </>
            ),
          };
        } else {
          totalGold1 += labelArr[0] * gold;
          totalGoldAnother1 += labelArr[0] * gold;
          janggi1 = lastRefineResult[
            labelArr[0] - 1 < lastRefineResult.length - 1
              ? labelArr[0] - 1
              : lastRefineResult.length - 1
          ].artisanEnergy as string;
          return {
            totalGold: (
              <StyledSpan marginLeft="2px">합계: {totalGold1.toLocaleString()}</StyledSpan>
            ),
            totalGoldAnother: (
              <StyledSpan marginLeft="2px">귀속O: {totalGoldAnother1.toLocaleString()}</StyledSpan>
            ),
            jangi: <StyledSpan marginLeft="2px">{janggi1}</StyledSpan>,
          };
        }
      }, [
        fusionMaterialId,
        gold,
        honorShard,
        label,
        leapstoneId,
        requiredSteelCount,
        requiredLeapStoneCount,
        requiredFusionMaterialCount,
        weaponOrArmour,
      ]);

      const materialRangeText = (materialCount: number) => {
        const labelArr = label.split('-');

        if (labelArr.length > 1) {
          return (
            <>
              <StyledSpan marginLeft="2px">
                {(labelArr[0] * materialCount).toLocaleString()}
              </StyledSpan>
              ~<StyledSpan>{(labelArr[1] * materialCount).toLocaleString()}</StyledSpan>
            </>
          );
        }

        return (
          <StyledSpan marginLeft="2px">{(labelArr[0] * materialCount).toLocaleString()}</StyledSpan>
        );
      };

      if (active && payload && payload.length) {
        return (
          <StyledDiv
            backgroundColor="#0E0F15"
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          >
            <StyledDiv display="grid" gridTemplateColumns="1fr 1fr" gap="2px" color="white">
              <StyledDiv>성공범주: {label}</StyledDiv>
              <StyledDiv>카운트: {payload[0].value}건</StyledDiv>
            </StyledDiv>
            <Divider />
            <StyledDiv color="white">
              <TooltipContentDiv>
                <StyledDiv display="flex" alignItems="center">
                  <Image
                    src={refineMaterialsMatchOverall.requiredSteelImg}
                    imageSize="mini"
                    type="image"
                    circular
                  />
                  {materialRangeText(refineMaterialsMatchOverall.requiredSteelCount)}
                </StyledDiv>
                <StyledDiv display="flex" alignItems="center">
                  <Image
                    src={refineMaterialsMatchOverall.requiredLeapStoneImg}
                    imageSize="mini"
                    type="image"
                    circular
                  />
                  {materialRangeText(refineMaterialsMatchOverall.requiredLeapStoneCount)}
                </StyledDiv>
                <StyledDiv display="flex" alignItems="center">
                  <Image
                    src={refineMaterialsMatchOverall.requiredFusionMaterialImg}
                    imageSize="mini"
                    type="image"
                    circular
                  />
                  {materialRangeText(refineMaterialsMatchOverall.requiredFusionMaterialCount)}
                </StyledDiv>
                <StyledDiv display="flex" alignItems="center">
                  <Image
                    src={'./assets/images/items/명예의파편.webp'}
                    imageSize="mini"
                    type="image"
                    circular
                  />
                  {materialRangeText(honorShard)}
                </StyledDiv>
                {isFullSoom && (
                  <>
                    <StyledDiv display="flex" alignItems="center">
                      <Image
                        src={'./assets/images/items/태양의은총.webp'}
                        imageSize="mini"
                        type="image"
                        circular
                      />
                      {materialRangeText(refineMaterialsMatchOverall['태양의은총'])}
                    </StyledDiv>
                    <StyledDiv display="flex" alignItems="center">
                      <Image
                        src={'./assets/images/items/태양의축복.webp'}
                        imageSize="mini"
                        type="image"
                        circular
                      />
                      {materialRangeText(refineMaterialsMatchOverall['태양의축복'])}
                    </StyledDiv>
                    <StyledDiv display="flex" alignItems="center">
                      <Image
                        src={'./assets/images/items/태양의가호.webp'}
                        imageSize="mini"
                        type="image"
                        circular
                      />
                      {materialRangeText(refineMaterialsMatchOverall['태양의가호'])}
                    </StyledDiv>
                  </>
                )}
                {refineMaterialsMatchOverall.applyBook &&
                Object.prototype.hasOwnProperty.call(refineMaterialsMatchOverall, 'bookProb') ? (
                  <StyledDiv display="flex" alignItems="center">
                    <Image
                      src={
                        loaImages[
                          refineMaterialsMatchOverall.bookProb.bookType as keyof typeof loaImages
                        ]
                      }
                      imageSize="mini"
                      type="image"
                      circular
                    />
                    <StyledSpan marginLeft="2px">{label.split('-')[0]}</StyledSpan>
                  </StyledDiv>
                ) : (
                  <></>
                )}

                <StyledDiv display="flex" alignItems="center">
                  <Image
                    src={'./assets/images/items/goldImage.webp'}
                    imageSize="mini"
                    type="image"
                    circular
                  />
                  {materialRangeText(gold)}
                </StyledDiv>
                <StyledDiv display="flex" alignItems="center">
                  <Image
                    src={'./assets/images/items/goldImage.webp'}
                    imageSize="mini"
                    type="image"
                    circular
                  />
                  {goldJanggiSummary && goldJanggiSummary.totalGold && goldJanggiSummary.totalGold}
                </StyledDiv>
                <StyledDiv display="flex" alignItems="center">
                  <Image
                    src={'./assets/images/items/goldImage.webp'}
                    imageSize="mini"
                    type="image"
                    circular
                  />
                  {goldJanggiSummary &&
                    goldJanggiSummary.totalGoldAnother &&
                    goldJanggiSummary.totalGoldAnother}
                </StyledDiv>
                <StyledDiv display="flex" alignItems="center">
                  <Image
                    src={'./assets/images/common/refinejanggi.gif'}
                    imageSize="mini"
                    type="image"
                    circular
                  />
                  {goldJanggiSummary && goldJanggiSummary.jangi && goldJanggiSummary.jangi}
                </StyledDiv>
              </TooltipContentDiv>
            </StyledDiv>
          </StyledDiv>
        );
      }

      return null;
    },
  );

  CustomTooltip.displayName = 'CustomTooltip';

  const areEqualProps = (prevProps: CustomTooltipProps, nextProps: CustomTooltipProps) => {
    return (
      isEqual(prevProps.label, nextProps.label) && isEqual(prevProps.payload, nextProps.payload)
    );
  };

  const CustomizeTooltipMemo = React.memo(CustomTooltip, areEqualProps);

  const deviceType = useDeviceType();

  return (
    <StyledDiv display="flex">
      <ResponsiveContainer width={deviceType === 'mobile' ? '100%' : '55%'} height={350}>
        <BarChart
          data={graphData.simulationResultGroupPointResultList}
          margin={{
            top: 20,
            right: deviceType === 'mobile' ? 0 : 30,
            left: deviceType === 'mobile' ? -30 : 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip content={<CustomizeTooltipMemo />} />
          <Legend
            wrapperStyle={{
              position: 'relative',
              top: '-30px',
            }}
            payload={[
              {
                value: '시뮬레이션 결과',
                type: 'star',
                id: 'LegendPayload',
                color: 'gold',
              },
            ]}
          />
          <Bar dataKey="count" fill="#8884d8" background={{ fill: '#0E0F15' }} />
          {graphData.topNPercentPointRange && (
            <ReferenceLine
              x={graphData.topNPercentPointRange.range}
              stroke="orange"
              label={{ value: `Top ${topNPercentPoint}%`, position: 'top', stroke: 'orange' }}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </StyledDiv>
  );
};

export default SimulationBarChart;
