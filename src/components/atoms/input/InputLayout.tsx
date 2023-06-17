/** ****************************************************************************************
 * @설명 : Input Layout component
 *        Input 컴포넌트를 쓸 때 항상 InputLayout으로 감싸서 사용 (label과 같이 쓰기 위함)
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2023-01-31   feature/JW/input            최초작성
 ********************************************************************************************/

import React from 'react';
import { Label, Header } from 'semantic-ui-react';
// import { inputElCommStyle } from '@utils/styleRelated/stylehelper';
// import classNames from 'classnames/bind';
import styled from 'styled-components';

import { InputLayoutProps } from './Types';

const StyledInputLayout = styled.div<InputLayoutProps>`
  margin-top: ${(props) => `${props.spacing || 0}px`};
  width: ${(props) => (props.stretch ? '100%' : props.inputWidth)} !important;
  padding-right: 10px;
`;

const StyledInputLabelHeader = styled(Header)`
  margin-bottom: 5px !important;
  position: relative;
  left: 0%;
`;

const StyledInputLabelHeader2 = styled(Header)`
  margin-bottom: 5px !important;
  position: relative;
  left: 0%;
  display: flex;
  align-items: center;
`;

const InputLayout = ({
  id,
  className = '',
  children,
  inputLabel = '',
  inputLabelSize = 'h2',
  showInputLabel = false,
  spacing = 0,
  stretch = false,
  error = false,
  errorMsg = '',
  errorLabelPosition = 'bottom',
  autoFitErrorLabel = false,
  inputWidth = 'auto', // stretch false 일 경우 width 따로 지정
}: InputLayoutProps) => {
  const labelSize = 'tiny';

  // ? By default, styled components are expected to have a single child... So Wrapped with React.Fragment
  return (
    <StyledInputLayout
      id={id}
      className={className}
      spacing={spacing}
      inputWidth={inputWidth}
      stretch={stretch}
    >
      <React.Fragment>
        {showInputLabel && (
          <label htmlFor={id}>
            {typeof inputLabel === 'string' ? (
              <StyledInputLabelHeader className="inputLabelHeader" as={inputLabelSize}>
                {inputLabel}
              </StyledInputLabelHeader>
            ) : (
              <StyledInputLabelHeader2 className="inputLabelHeader" as={inputLabelSize}>
                {inputLabel}
              </StyledInputLabelHeader2>
            )}
          </label>
        )}
        {React.cloneElement(children, { stretch: stretch ? 'true' : 'false', error })}
        {errorLabelPosition === 'bottom' && <br />}
        {autoFitErrorLabel ? (
          <Label
            basic
            color="red"
            pointing={errorLabelPosition === 'right' ? 'left' : 'above'}
            style={{ visibility: `${error ? 'initial' : 'hidden'}` }}
            size={labelSize}
          >
            {errorMsg}
          </Label>
        ) : (
          error && (
            <Label
              basic
              color="red"
              pointing={errorLabelPosition === 'right' ? 'left' : 'above'}
              size={labelSize}
            >
              {errorMsg}
            </Label>
          )
        )}
      </React.Fragment>
    </StyledInputLayout>
  );
};

InputLayout.displayName = 'InputLayout';

export default InputLayout;
