import React from 'react';
import { format } from 'date-fns';
import { loaImages } from '@consts/imgSrc';
import styled from 'styled-components';
import { ko } from 'date-fns/locale';
import { colorMapping } from './ItemPriceModal';

const StyledImage = styled.img`
  vertical-align: inherit;
  width: ${(props) => (props.width ? props.width : 'auto')};
  margin-left: 2px;
`;

const TooltipContainer = styled.div`
  background-color: #000000;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  color: #ffffff;
  border: 1px solid white;
`;

const TooltipDivider = styled.div`
  margin-top: 8px;
  border-top: 1px solid #ffffff;
`;

const TooltipLabel = styled.h4`
  margin: 0;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
`;

const TooltipContent = styled.div`
  margin-top: 8px;
`;

const TooltipItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  color: #ffffff;
  font-size: 14px;
`;

interface TooltipKeyProps {
  color?: string;
}

const TooltipKey = styled.span<TooltipKeyProps>`
  font-weight: bold;
  color: ${(props) => (props.color ? props.color : '#00a0e9')};
  margin-right: 5px;
`;

interface ITooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const getValueByDataKey = (payload: any[], dataKey: string) => {
  const entry = payload.find((item) => item.dataKey === dataKey);

  return entry ? entry.value : undefined;
};

const CustomTooltip = ({ active, payload, label }: ITooltipProps) => {
  if (label && active && payload && payload.length) {
    const maxPrice = getValueByDataKey(payload, 'maxCurrentMinPrice');
    const minPrice = getValueByDataKey(payload, 'minCurrentMinPrice');
    const avgPrice = getValueByDataKey(payload, 'avgCurrentMinPrice');

    const day = format(new Date(label), 'EEEE', { locale: ko });

    return (
      <TooltipContainer>
        <TooltipLabel>{`${label} (${day[0]})`}</TooltipLabel>
        <TooltipDivider />
        <TooltipContent>
          <TooltipItem>
            <TooltipKey color={colorMapping.maxCurrentMinPrice}>최대가격:</TooltipKey> {maxPrice}
            <StyledImage src={loaImages['골드배경X']} width={25} />
          </TooltipItem>
          <TooltipItem>
            <TooltipKey color={colorMapping.avgCurrentMinPrice}>평균가격:</TooltipKey>{' '}
            {Number(avgPrice.toFixed(2))}
            <StyledImage src={loaImages['골드배경X']} width={25} />
          </TooltipItem>
          <TooltipItem>
            <TooltipKey color={colorMapping.minCurrentMinPrice}>최소가격:</TooltipKey> {minPrice}
            <StyledImage src={loaImages['골드배경X']} width={25} />
          </TooltipItem>
        </TooltipContent>
      </TooltipContainer>
    );
  }

  return null;
};

const areEqualProps = (prevProps: ITooltipProps, nextProps: ITooltipProps) => {
  return prevProps.label === nextProps.label;
};

export default React.memo(CustomTooltip, areEqualProps);
