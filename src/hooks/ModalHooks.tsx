import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { IModalState } from '@components/modal/Types';
import { showModal as ModalShow, closeModal as ModalHide } from '@state/modalSlice';

const useModal = () => {
  const dispatch = useDispatch();

  const showModal = useCallback(
    (args: IModalState) => {
      const {
        modalTitle = '',
        modalContent = null,
        modalSize = 'small',
        modalIsBasic = false,
        modalFitContentWidth = false,
        modalShowCloseIcon = 'Y',
        modalContentId = '',
        modalContentBackground = '#30343F',
      } = args;

      dispatch(
        ModalShow({
          modalOpen: true,
          modalTitle,
          modalContent,
          modalSize,
          modalIsBasic,
          modalContentBackground,
          modalContentId,
          modalFitContentWidth,
          modalShowCloseIcon,
        }),
      );
    },
    [dispatch],
  );

  const hideModal = useCallback(() => {
    dispatch(ModalHide());
  }, [dispatch]);

  return {
    showModal,
    hideModal,
  };
};

export default useModal;
