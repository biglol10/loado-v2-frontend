import React, { useMemo } from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.button<any>`
  background-color: ${(props) => (props.isSelected ? '#717C87' : '#343540')};
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  margin: 4px;
  cursor: pointer;
`;

const RadioButton = ({ label, value, selectedValue, onChange }: any) => {
  const isSelected = useMemo(() => {
    return selectedValue === value;
  }, [selectedValue, value]);

  const handleClick = () => {
    if (!isSelected) {
      onChange(value);
    }
  };

  return (
    <ButtonContainer isSelected={isSelected} onClick={handleClick}>
      {label}
    </ButtonContainer>
  );
};

const RadioButtonGroup = ({
  options,
  selectedValue,
  onChange,
}: {
  options: { label: string; value: string }[];
  selectedValue: string;
  onChange: Function;
}) => {
  return (
    <div>
      {options.map((option: any, i: number) => (
        <RadioButton
          key={`RadioButton_${option.value}_${i}`}
          label={option.label}
          value={option.value}
          selectedValue={selectedValue}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

export default RadioButtonGroup;
