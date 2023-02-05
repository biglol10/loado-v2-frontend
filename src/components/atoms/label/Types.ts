import React, { ReactNode, JSXElementConstructor as JSX, ChangeEvent, SyntheticEvent } from 'react';
import { ButtonProps, StrictLabelProps } from 'semantic-ui-react';

export interface ILabel {
  basic?: boolean;
  content?: string | JSX.Element;
  iconOrImage?: 'icon' | 'image' | 'none';
  icon?: ReactNode;
  nextImage?: JSX.Element;
  color?: string;
  borderNone?: boolean;
  size?: StrictLabelProps['size'];
  spacing?: number;
  paddingNone?: boolean;
  className?: string;
}
