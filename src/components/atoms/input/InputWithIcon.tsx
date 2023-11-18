/** ****************************************************************************************
 * @설명 : Input With Icon
 *        Icon이 있는 Input (Semantic UI Icon)
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2023-01-31   feature/JW/input            최초작성
 ********************************************************************************************/

import React, { ChangeEvent, forwardRef } from 'react';
import { Icon } from 'semantic-ui-react';
import { InputWithIconProps } from './Types';
import { StyledBaseInput } from './Styled';
import InputHOCMain from './hoc/InputHOCMain';

const InputWithIcon = forwardRef<null, InputWithIconProps>(
  (
    {
      id = '',
      className = '',
      placeholder = '',
      value = '',
      onChange = undefined,
      size = 'small',
      error = false,
      loading = false,
      type = 'default',
      readOnly = false,
      disabled = false,
      maxLength = undefined,
      inputIcon = <Icon name="search" />,
      stretch = false,
      onEnter = null,
      iconPosition = undefined,
      iconClick = null,
      setInputValue = null,
    },
    ref,
  ) => {
    const removeText = () => {
      setInputValue && setInputValue('');
      // onChange &&
      //   onChange(null, {
      //     value: '',
      //   });
    };

    const IconClone = React.cloneElement(inputIcon as React.ReactElement, {
      link: true,
      onClick: () => {
        iconClick ? iconClick() : removeText();
      },
    });

    return (
      <StyledBaseInput
        id={id}
        className={className}
        loading={loading}
        size={size}
        error={error}
        icon
        iconPosition={iconPosition}
        style={stretch ? { width: '100%' } : {}}
        // stretch={stretch}
      >
        {iconPosition === 'left' ? (
          <>
            {IconClone}
            <input
              ref={ref}
              value={value}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                onChange && onChange(e, { value: e.target.value });
              }}
              type={`${type === 'default' ? '' : type}`}
              placeholder={placeholder}
              readOnly={readOnly}
              disabled={disabled}
              maxLength={maxLength}
              onKeyUp={(evt: any) => evt.key === 'Enter' && onEnter && onEnter()}
            />
          </>
        ) : (
          <>
            <input
              ref={ref}
              value={value}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                onChange && onChange(e, { value: e.target.value });
              }}
              type={`${type === 'default' ? '' : type}`}
              placeholder={placeholder}
              readOnly={readOnly}
              disabled={disabled}
              maxLength={maxLength}
              onKeyUp={(evt: any) => evt.key === 'Enter' && onEnter && onEnter()}
            />
            {IconClone}
          </>
        )}
      </StyledBaseInput>
    );
  },
);

InputWithIcon.displayName = 'InputWithIcon';

export default InputHOCMain(InputWithIcon);
