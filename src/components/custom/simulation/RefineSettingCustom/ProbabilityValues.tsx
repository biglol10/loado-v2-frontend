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

const ProbabilityValues: React.FC<ProbabilityValuesProps> = ({
  refineOverallSetting,
  setRefineOverallSetting,
}) => {
  return (
    <StyledGridDiv>
      <InputLayout
        inputLabel={'최종확률'}
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
          inputIcon={<Icon name="percent" color="black" />}
          type="number"
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
          inputIcon={<Icon name="percent" color="black" />}
          type="number"
        />
      </InputLayout>
      {/* <InputLayout
        inputLabel={'추가확률'}
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
          inputIcon={<Icon name="percent" color="black" />}
          type="number"
        />
      </InputLayout> */}
    </StyledGridDiv>
  );
};

export default ProbabilityValues;
