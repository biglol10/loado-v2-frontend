import { useEffect, useState } from 'react';
import { Checkbox } from 'semantic-ui-react';
import styled from 'styled-components';
import { ICheckboxDefault } from './Types';
import { Label } from '../label';

const StyledCheckboxLabelTop = styled.div<{ spacing: number }>`
  display: flex;
  flex-direction: column;
  width: max-content;
  align-items: center;
  padding: 5px;
  margin-top: ${(props) => `${props.spacing}px !important`};

  & .checkBox {
    align-items: center;
  }
  & .checkBoxLabel {
    background-color: transparent;
  }
`;

const StyledCheckboxLabelRight = styled.div<{ spacing: number }>`
  background-color: black;
  display: flex;
  align-items: center;
  width: max-content;
  padding: 5px;
  width: max-content;
  margin-top: ${(props) => `${props.spacing}px !important`};

  & .checkBox {
    align-items: center;
  }
  & .checkBoxLabel {
    background-color: black;
    // height: 20px;
    display: flex;
    align-items: center;
  }
`;

const CheckboxDefault = ({
  className = '',
  id = '',
  disabled = false,
  checked = false,
  size = 'small',
  label = 'test',
  labelPosition = 'right',
  onClick = () => null,
  spacing = 0,
  fontColor = 'black',
}: ICheckboxDefault) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);
  const onChangeFn = () => {
    setIsChecked((prevChecked) => !prevChecked);

    onClick &&
      onClick({
        id,
        isChecked,
      });
  };

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  // useEffect(() => {
  //   onClick &&
  //     onClick({
  //       id,
  //       isChecked,
  //     });
  // }, [id, isChecked, onClick]);

  return (
    <>
      {labelPosition === 'top' && (
        <StyledCheckboxLabelTop className={`${className}`} spacing={spacing}>
          <div>
            <Label content={label} color={fontColor} />
          </div>
          <Checkbox
            className={'div_checkbox'}
            id={id}
            onChange={onChangeFn}
            disabled={disabled}
            checked={isChecked}
            size={size}
          />
        </StyledCheckboxLabelTop>
      )}
      {(labelPosition === 'right' || labelPosition === undefined) && (
        <StyledCheckboxLabelRight className={className} spacing={spacing}>
          <Checkbox
            className={'div_checkbox'}
            id={id}
            onChange={onChangeFn}
            disabled={disabled}
            checked={isChecked}
            size={size}
          />
          <Label content={label} color={fontColor} />
        </StyledCheckboxLabelRight>
      )}
    </>
  );
};

CheckboxDefault.displayName = 'CheckboxDefault';

export default CheckboxDefault;
