import React, {
  ReactNode,
  JSXElementConstructor as JSX,
  ChangeEvent,
  SyntheticEvent,
  ChangeEventHandler,
} from 'react';
import {
  ButtonProps,
  DropdownProps,
  Input,
  InputOnChangeData,
  InputProps,
  StrictLabelProps,
  StrictInputProps,
  Dropdown,
} from 'semantic-ui-react';

// ? Types in InputDefault component
export interface InputDefaultProps extends StrictInputProps {
  id?: string;
  placeholder?: string;
  value?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => void;
  size?: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive';
  loading?: boolean;
  type?: 'default' | 'password' | 'number';
  readOnly?: boolean;
  disabled?: boolean;
  maxLength?: undefined | number;
  ref?: any;
  // stretch?: boolean;
  error?: boolean;
  onEnter?: Function;
  clearInputValue?: Function; //
  transparent?: boolean; //
  fluid?: boolean;
}

export interface InputDefaultPropsNumber extends StrictInputProps {
  id?: string;
  placeholder?: string;
  value?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => void;
  size?: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive';
  loading?: boolean;
  type?: 'number';
  readOnly?: boolean;
  disabled?: boolean;
  maxLength?: undefined | number;
  ref?: any;
  // stretch?: boolean;
  error?: boolean;
  onEnter?: Function;
  clearInputValue?: Function;
  transparent?: boolean;
  fluid?: boolean;
}

// ? Types in InputDropdown component
export interface InputDropdownProps extends DropdownProps {
  id?: string;
  className?: string;
  placeholder?: string;
  value?: any;
  options?: object[];
  onChange?: (event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => void;
  loading?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  stretch?: boolean;
  error?: boolean;
  onEnter?: Function;
  keyboardInput?: boolean;
  compact?: boolean;
}

// ? Types in InputLayout component
export interface InputLayoutProps {
  id?: string;
  className?: string;
  children: React.ReactElement;
  inputLabel?: string | any;
  inputLabelSize?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  showInputLabel?: boolean;
  spacing?: number;
  stretch?: boolean;
  error?: boolean;
  errorMsg?: string;
  errorLabelPosition?: 'bottom' | 'right';
  autoFitErrorLabel?: boolean;
  inputWidth?: 'auto' | string;
}

// ? Types in InputSearch component
export interface InputSearchProps extends InputDefaultProps {
  onSearchIconClick?: Function;
}

// ? Types in InputWithIcon component
export interface InputWithIconProps extends InputDefaultProps {
  inputIcon?: React.ReactElement;
  iconPosition?: 'left' | undefined;
  iconClick?: Function;
  setInputValue?: Function;
  stretch?: boolean;
  onChange?: any;
}

export type InputHOCRefType = { inputElement: Input | undefined; clear: () => void };
export type DropdownHOCRefType = {
  dropdownElement: typeof Dropdown | undefined;
  clear: () => void;
};

export type InputHOCRefMainType = React.Ref<InputHOCRefType> | undefined;

// export type DropdownHOCRefMainType = React.Ref<DropdownHOCRefType>

export interface InputWithIconProps2 extends Omit<StrictInputProps, 'onChange'> {
  id?: string;
  placeholder?: string;
  value?: string | number;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => void;
  size?: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive';
  loading?: boolean;
  type?: 'default' | 'password' | 'number';
  readOnly?: boolean;
  disabled?: boolean;
  maxLength?: undefined | number;
  ref?: any;
  stretch?: boolean;
  error?: boolean;
  onEnter?: Function;
  inputIcon?: React.ReactElement;
  iconPosition?: 'left';
  iconClick?: Function;
  setInputValue?: Function;
}
