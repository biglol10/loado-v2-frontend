import { ReactNode, JSXElementConstructor as JSX } from 'react';

export interface IBox {
  id: string;
  children: string | JSX.Element | ReactNode;
  boxType?: 'basic' | 'primary' | 'error';
  textAlign?: 'left' | 'center' | 'right';
  className?: string;
  spacing?: number;
  onClick?: any;
  stretch?: boolean | string;
}
