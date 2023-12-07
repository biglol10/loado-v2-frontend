/** ****************************************************************************************
 * @설명 : Input Dropdown
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2023-01-31   feature/JW/input           최초작성
 ********************************************************************************************/

import { forwardRef, Component, useRef, useImperativeHandle } from 'react';
import { DropdownProps } from 'semantic-ui-react';
import { InputDropdownProps } from './Types';
// import InputDropdownHOC from './hoc/InputDropdownHOC';
import InputHoc from './hoc/InputHOC';
import { StyledBaseDropdown } from './Styled';
import InputDropdownHOC from './hoc/InputDropdownHOC';

const InputDropdown = forwardRef<null, InputDropdownProps>(
  (
    {
      id = '',
      className = '',
      placeholder = '',
      value = '',
      options = [],
      onChange = null,
      keyboardInput = false,
      loading = false,
      multiple = false,
      disabled = false,
      stretch = false,
      error = false,
      onEnter = null,
      compact = false,
      ...rest
    },
    ref,
  ) => {
    // const inputRef = useRef<any>();

    // // 필요에 따라 추가
    // useImperativeHandle(ref, () => ({
    //   inputElement: inputRef.current,
    // }));

    return (
      <StyledBaseDropdown
        {...rest}
        ref={ref}
        id={id}
        className={className}
        // ref={inputRef}
        placeholder={placeholder}
        value={value}
        options={options}
        onChange={onChange}
        loading={loading}
        multiple={multiple}
        disabled={disabled}
        error={error}
        selection
        search={keyboardInput}
        onKeyUp={(evt: KeyboardEvent) => evt.key === 'Enter' && onEnter && onEnter()}
        // style={stretch ? { width: '100%' } : {}}
        stretch={stretch}
        style={{
          color: 'black',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        compact={compact}
      />
    );
  },
);

InputDropdown.displayName = 'InputDropdown';

export default InputDropdownHOC(InputDropdown);
