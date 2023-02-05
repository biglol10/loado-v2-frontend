import { JSXElementConstructor as JSX } from 'react';

export interface IListItem {
  content: string | JSX.Element;
}

export interface IList {
  id: string;
  listType: 'buletted' | 'ordered' | 'none';
  verticalAlign?: 'bottom' | 'middle' | 'top';
  items: IListItem[];
  className?: string;
}
