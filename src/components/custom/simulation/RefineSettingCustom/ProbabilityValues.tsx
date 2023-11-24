import React from 'react';
import { InputLayout, InputWithIcon } from '@components/atoms/input';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { RefineOverallSettingType } from '../RefineSetting';

const StyledGridDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

interface ProbabilityValuesProps {
  refineOverallSetting: RefineOverallSettingType;
  setRefineOverallSetting: React.Dispatch<React.SetStateAction<RefineOverallSettingType>>;
}

export const PercentIcon = () => {
  return <Icon name="percent" color="black" />;
};

const ProbabilityValues: React.FC<ProbabilityValuesProps> = ({
  refineOverallSetting,
  setRefineOverallSetting,
}) => {
  return (
    <StyledGridDiv>
      <InputLayout
        inputLabel={'제련확률'}
        inputLabelSize={'h6'}
        stretch={false}
        showInputLabel={true}
        spacing={8}
        inputWidth={'150px'}
      >
        <InputWithIcon
          value={`${refineOverallSetting.honingSuccessRate}`}
          fluid={false}
          size={'mini'}
          onChange={(value) => {
            // alert('I am in onChange in ProbabilityValues');
            setRefineOverallSetting((prev) => ({
              ...prev,
              honingSuccessRateManual: value,
            }));
          }}
          inputIcon={<PercentIcon />}
          type="number"
        />
      </InputLayout>
      <InputLayout
        inputLabel={'추가확률'}
        inputLabelSize={'h6'}
        stretch={false}
        showInputLabel={true}
        spacing={8}
        inputWidth={'150px'}
      >
        <InputWithIcon
          value={`${
            refineOverallSetting.kamenRoad ? refineOverallSetting.additionalProbability : '0'
          }`}
          fluid={false}
          size={'mini'}
          onChange={(value) => {
            setRefineOverallSetting((prev) => ({
              ...prev,
              additionalProbability: value,
            }));
          }}
          inputIcon={<PercentIcon />}
          type="number"
          disabled
        />
      </InputLayout>
      <InputLayout
        inputLabel={'장인의기운'}
        inputLabelSize={'h6'}
        stretch={false}
        showInputLabel={true}
        spacing={8}
        inputWidth={'150px'}
      >
        <InputWithIcon
          value={`${refineOverallSetting.artisanEnergy}`}
          fluid={false}
          size={'mini'}
          onChange={(value) => {
            setRefineOverallSetting((prev) => ({
              ...prev,
              artisanEnergy: value,
            }));
          }}
          inputIcon={<PercentIcon />}
          type="number"
        />
      </InputLayout>
    </StyledGridDiv>
  );
};

export default ProbabilityValues;
