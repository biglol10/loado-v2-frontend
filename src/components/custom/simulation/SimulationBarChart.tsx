import React, { useEffect, useMemo } from 'react';
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
import { marketItemIdMatch } from '@consts/requiredRefineMaterials';
import { Image } from '@components/atoms/image';
import { Divider } from 'semantic-ui-react';
import { loaImages } from '@consts/imgSrc';

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: any[];
  label?: string;
}

type ProcessedDataItem = {
  range: string;
  count: number;
};

type GraphDataType = {
  processedData: ProcessedDataItem[];
  top30PercentCategory?: ProcessedDataItem;
};

const SimulationBarChart = ({
  graphData,
  refineMaterialsMatchOverall,
  isFullSoom,
  itemsQueryData,
}: {
  graphData: GraphDataType;
  refineMaterialsMatchOverall: any;
  isFullSoom: Boolean;
  itemsQueryData: {
    result: String;
    resultArr: { itemId: String; itemName: String; currentMinPrice: number }[];
  };
}) => {
  const CustomTooltip: React.FC<CustomTooltipProps> = React.memo(
    ({ active, payload, label }: any) => {
      useEffect(() => {
        console.log(`label is ${label}`);
        console.log(refineMaterialsMatchOverall);
        console.log('itemsQueryData is');
        console.log(itemsQueryData);
      }, [label]);

      const { weaponOrArmour, leapstoneId, fusionMaterialId, gold, honorShard, mat1, mat2, mat3 } =
        refineMaterialsMatchOverall;

      const goldValue = useMemo(() => {
        if (!label) return 0;
        const labelArr = label.split('-');
        const refineStoneId = refineMaterialsMatchOverall[`${weaponOrArmour}StoneId`];

        const priceToGetList = [
          { id: refineStoneId, count: mat1, bundleCount: 10 },
          { id: leapstoneId, count: mat2, bundleCount: 1 },
          { id: fusionMaterialId, count: mat3, bundleCount: 1 },
          { id: '66130133', count: 1, bundleCount: 1500 },
        ];

        console.log(itemsQueryData);

        // eslint-disable-next-line prefer-const
        let totalGold = 0;

        for (const itemObj of priceToGetList) {
          const currentMinPrice = itemsQueryData.resultArr.find(
            (itemQuery) => itemQuery.itemId === itemObj.id,
          )?.currentMinPrice;

          // alert(`labelArr[0] is ${labelArr[0]} and value is ${currentMinPrice! * labelArr[0]}`);

          if (currentMinPrice)
            totalGold += Math.floor(
              (currentMinPrice * labelArr[0] * itemObj.count) / itemObj.bundleCount,
            );
        }

        return totalGold;
      }, [fusionMaterialId, label, leapstoneId, mat1, mat2, mat3, weaponOrArmour]);

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
              <StyledDiv display="grid" gridTemplateColumns="1fr 1fr" gap="2px">
                <StyledDiv display="flex" alignItems="center">
                  <Image
                    src={refineMaterialsMatchOverall.mat1Img}
                    imageSize="mini"
                    type="image"
                    circular
                  />
                  {materialRangeText(refineMaterialsMatchOverall.mat1)}
                </StyledDiv>
                <StyledDiv display="flex" alignItems="center">
                  <Image
                    src={refineMaterialsMatchOverall.mat2Img}
                    imageSize="mini"
                    type="image"
                    circular
                  />
                  {materialRangeText(refineMaterialsMatchOverall.mat2)}
                </StyledDiv>
                <StyledDiv display="flex" alignItems="center">
                  <Image
                    src={refineMaterialsMatchOverall.mat3Img}
                    imageSize="mini"
                    type="image"
                    circular
                  />
                  {materialRangeText(refineMaterialsMatchOverall.mat3)}
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
                  {goldValue.toLocaleString()}
                </StyledDiv>
              </StyledDiv>
            </StyledDiv>
          </StyledDiv>
        );
      }

      return null;
    },
  );

  CustomTooltip.displayName = 'CustomTooltip';

  return (
    <StyledDiv display="flex">
      <ResponsiveContainer width="55%" height={350}>
        <BarChart
          data={graphData.processedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
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
          {graphData.top30PercentCategory && (
            <ReferenceLine
              x={graphData.top30PercentCategory.range}
              stroke="orange"
              label={{ value: 'Top 30%', position: 'top', stroke: 'orange' }}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </StyledDiv>
  );
};

export default SimulationBarChart;
