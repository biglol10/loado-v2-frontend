import { StrictLabelProps } from 'semantic-ui-react';

export interface ICheckboxDefault {
  className?: string;
  id: string;
  disabled?: boolean;
  checked?: boolean;
  size?: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive';
  label?: string;
  labelPosition?: 'top' | 'right' | undefined;
  onClick?: ({ id, isChecked }: { id: string; isChecked: boolean }) => void;
  fontColor?: StrictLabelProps['color'];
  spacing?: number;
}

export interface ICheckboxListDefault {
  id?: string;
  size?: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive';
  labelPosition?: 'top' | 'right' | undefined;
  onChange?: any;
  direction?: 'horizontal' | 'vertical' | undefined;
  items?: Array<{ id: string; disabled?: boolean; checked?: boolean; label?: string }>;
  fontColor?: StrictLabelProps['color'];
  spacing?: number;
}
