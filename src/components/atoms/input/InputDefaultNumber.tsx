/** ****************************************************************************************
 * @설명 : Input Default
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2023-01-31   feature/JW/input            최초작성
 ********************************************************************************************/

import { forwardRef } from 'react';
import { InputDefaultNumberProps } from './Types';
import { StyledBaseInput } from './Styled';
import InputHOCMain from './hoc/InputHOCMain';

const InputDefaultNumber = forwardRef<null, InputDefaultNumberProps>(
  (
    {
      id = '',
      className = '',
      placeholder = '',
      value = '',
      onChange = null,
      size = 'small',
      loading = false,
      type = 'number',
      readOnly = false,
      disabled = false,
      maxLength = undefined,
      // stretch = false,
      error = false,
      onEnter = null,
      transparent = false,
      fluid = false,
      ...rest
    },
    ref,
  ) => {
    // ! Styled에 props로 넘길 것은 string으로 하는게 에러가 발생 안 하는듯? stretch={boolean값} 했을 때 Warning: Received `true` for a non-boolean attribute `stretch`. 발생
    return (
      <StyledBaseInput
        {...rest}
        id={id}
        className={className}
        loading={loading}
        placeholder={placeholder}
        ref={ref}
        value={value}
        onChange={onChange}
        size={size}
        error={error}
        // type={type}
        readOnly={readOnly}
        disabled={disabled}
        maxLength={maxLength}
        // style={stretch ? { width: '100%' } : {}}
        // stretch={stretch}
        onKeyUp={(evt: KeyboardEvent) => evt.key === 'Enter' && onEnter && onEnter()}
        transparent={transparent}
        defaultValue={value}
        fluid={fluid}
      />
    );
  },
);

InputDefaultNumber.displayName = 'InputDefaultNumber';

export default InputHOCMain(InputDefaultNumber);
