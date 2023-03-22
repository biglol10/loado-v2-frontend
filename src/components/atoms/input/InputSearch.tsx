/** ****************************************************************************************
 * @설명 : Input Search
 *        돋보기가 있는 Input
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2023-01-31   feature/JW/input            최초작성
 ********************************************************************************************/

import { forwardRef } from 'react';
import { Input, Icon } from 'semantic-ui-react';
import { IInputSearch } from './Types';
import InputHoc from './hoc/InputHOC';
import { StyledBaseInput } from './Styled';

const InputSearch = forwardRef<Input, IInputSearch>(
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
      onSearchIconClick = null,
      // stretch = false,
      error = false,
      onEnter = null,
    },
    ref,
  ) => {
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
        icon={<Icon name="search" circular link onClick={onSearchIconClick && onSearchIconClick} />}
        // style={stretch ? { width: '100%' } : {}}
        // stretch={stretch}
        onKeyUp={(evt: KeyboardEvent) => evt.key === 'Enter' && onEnter && onEnter()}
      />
    );
  },
);

InputSearch.displayName = 'InputSearch';

export default InputHoc(InputSearch);
