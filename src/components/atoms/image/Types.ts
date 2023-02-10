import { JSXElementConstructor as JSX } from 'react';
import { loaImages } from '@consts/imgSrc';

export interface IAvatar {
  id?: string;
  src?: keyof typeof loaImages | string | null;
  content: string | JSX.Element;
  fontColor?: string;
  spacing?: number;
  avatar?: boolean;
  imageSize?: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive';
  labelSize?: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive';
  svgColor?: string;
  restrictColor?: boolean;
}
