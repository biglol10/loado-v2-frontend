import React, { ReactNode, JSXElementConstructor as JSX, ChangeEvent, SyntheticEvent } from 'react';
import {
  ButtonProps,
  DropdownProps,
  InputOnChangeData,
  InputProps,
  StrictLabelProps,
} from 'semantic-ui-react';

// ? Types in InputDefault component
export interface IInputDefault extends InputProps {
  id: string;
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
  clearInputValue?: Function;
  transparent?: boolean;
  fluid?: boolean;
}

export interface IInputDefaultNumber extends InputProps {
  id: string;
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
export interface IInputDropdown extends DropdownProps {
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
export interface IInputLayout {
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
export interface IInputSearch extends IInputDefault {
  onSearchIconClick?: Function;
}

// ? Types in InputWithIcon component
export interface IInputWithIcon extends IInputDefault {
  inputIcon?: React.ReactElement;
  iconPosition?: 'left' | undefined;
  iconClick?: Function;
  setInputValue?: Function;
  stretch?: boolean;
  onChange?: any;
}
