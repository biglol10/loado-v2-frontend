import { InputLayout, InputWithIcon } from '@components/atoms/input';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const StyledGridDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const ProbabilityValues = ({ refineOverallSetting, setRefineOverallSetting }: any) => {
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
          value={refineOverallSetting.honingSuccessRate}
          fluid={false}
          size={'mini'}
          onChange={({ value }: any) => {
            setRefineOverallSetting((prev: any) => ({
              ...prev,
              honingSuccessRate: value,
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
          value={refineOverallSetting.artisanEnergy}
          fluid={false}
          size={'mini'}
          onChange={({ value }: any) => {
            setRefineOverallSetting((prev: any) => ({
              ...prev,
              artisanEnergy: value,
            }));
          }}
          inputIcon={<Icon name="percent" color="black" />}
          type="number"
        />
      </InputLayout>
    </StyledGridDiv>
  );
};

export default ProbabilityValues;
