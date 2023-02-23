/** ****************************************************************************************
 * @설명 : Input Default
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2023-01-31   feature/JW/input            최초작성
 ********************************************************************************************/

import { forwardRef } from 'react';
import { Input } from 'semantic-ui-react';
import { IInputDefault } from './Types';
import { StyledBaseInput } from './Styled';
import InputHoc from './hoc/InputHOC';

const InputDefault = forwardRef<{ inputElement: Input | undefined }, IInputDefault>(
  (
    {
      id = '',
      className = '',
      placeholder = '',
      value = '',
      onChange = null,
      size = 'small',
      loading = false,
      type = 'default',
      readOnly = false,
      disabled = false,
      maxLength = undefined,
      stretch = false,
      error = false,
      onEnter = null,
      transparent = false,
      fluid = false,
    },
    ref,
  ) => {
    // ! Styled에 props로 넘길 것은 string으로 하는게 에러가 발생 안 하는듯? stretch={boolean값} 했을 때 Warning: Received `true` for a non-boolean attribute `stretch`. 발생
    return (
      <StyledBaseInput
        id={id}
        className={className}
        loading={loading}
        placeholder={placeholder}
        ref={ref}
        value={value}
        onChange={onChange}
        size={size}
        error={error}
        type={`${type === 'default' ? '' : type}`}
        readOnly={readOnly}
        disabled={disabled}
        maxLength={maxLength}
        // style={stretch ? { width: '100%' } : {}}
        stretch={stretch}
        onKeyUp={(evt: KeyboardEvent) => evt.key === 'Enter' && onEnter && onEnter()}
        transparent={transparent}
        fluid={fluid}
      />
    );
  },
);

InputDefault.displayName = 'InputDefault';

export default InputHoc(InputDefault);
