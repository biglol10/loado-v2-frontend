import React from 'react';

export interface IModalState {
  modalOpen?: boolean;
  modalTitle?: string | React.ReactNode;
  modalContent?: React.ReactElement | string | null;
  modalSize?: 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen' | undefined;
  modalIsBasic?: boolean;
  modalFitContentWidth?: boolean;
  modalShowCloseIcon?: 'Y' | 'N';
  modalContentId?: string;
  modalContentBackground?: string;
}

export const modalUISize: {
  [key: string]: 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen' | undefined;
} = {
  MINI: 'mini',
  TINY: 'tiny',
  SMALL: 'small',
  LARGE: 'large',
  FULLSCREEN: 'fullscreen',
};
