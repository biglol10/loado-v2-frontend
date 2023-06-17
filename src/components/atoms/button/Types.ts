import { JSXElementConstructor as JSX } from 'react';
import { ButtonProps } from 'semantic-ui-react';
import { InputDefaultProps } from '../input/Types';

export interface IButton {
  className?: string;
  buttonType?: 'primary' | 'secondary' | 'none';
  content: string | JSX.Element;
  basic?: boolean;
  color?: ButtonProps['color'];
  size?: InputDefaultProps['size'];
  loading?: boolean;
  onClick?: any;
  spacing?: number;
  disabled?: boolean;
  inverted?: boolean;
}
