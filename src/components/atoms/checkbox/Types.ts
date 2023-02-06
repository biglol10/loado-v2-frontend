import { StrictLabelProps } from 'semantic-ui-react';

export interface ICheckboxDefault {
  className?: string;
  id: string;
  disabled?: boolean;
  checked?: boolean;
  size?: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive';
  label?: string;
  labelPosition?: 'top' | 'right' | undefined;
  onClick?: any;
  fontColor?: StrictLabelProps['color'];
  spacing?: number;
}
