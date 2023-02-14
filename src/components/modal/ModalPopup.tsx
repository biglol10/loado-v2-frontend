import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import { closeModal } from '@state/modalSlice';
import { IModalState, modalUISize } from './Types';

const ModalPopup = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state: { modal: IModalState }) => state.modal);
  const open = modalState.modalOpen;
  // const open = true;
  const content = modalState.modalContent;
  const modalSize = modalState.modalSize || modalUISize.SMALL;
  const title = modalState.modalTitle || '';
  const isBasic = modalState.modalIsBasic || false;
  const fitContentWidth = modalState.modalFitContentWidth || false;
  const showCloseIcon = modalState.modalShowCloseIcon;
  const elementId = modalState.modalContentId;
  const modalContentBackground = modalState.modalContentBackground || '#30343F';

  const handleClose = () => {
    dispatch(closeModal());
  };

  const [modalContentWidth, setModalContentWidth] = useState<number>(0);

  useEffect(() => {
    try {
      if (fitContentWidth && elementId) {
        const el = document.getElementById(elementId);

        if (el) {
          setModalContentWidth(el.offsetWidth);
        }
      }
    } catch {}

    // 안 해주면 열 때마다 modal이 줄어드는 현상 발생
    return () => {
      setModalContentWidth(0);
    };
  }, [elementId, fitContentWidth]);

  return (
    <div>
      {/* {lodash merge로 생성한 modalProps로 ...modalProps하여 제어해봤지만 제대로 resize안되서 return 문에 분기 } */}
      {fitContentWidth && modalContentWidth ? (
        <Modal
          open={open}
          onClose={handleClose}
          basic={isBasic}
          closeIcon={showCloseIcon === 'Y'}
          style={{ width: `${modalContentWidth}px` }}
          id="loado_modal"
        >
          {title && <Modal.Header>{title}</Modal.Header>}
          <Modal.Content style={{ backgroundColor: modalContentBackground, color: 'black' }}>
            {content}
          </Modal.Content>
        </Modal>
      ) : (
        <Modal
          open={open}
          onClose={handleClose}
          size={modalSize}
          basic={isBasic}
          closeIcon={showCloseIcon === 'Y'}
          id="loado_modal"
        >
          {title && <Modal.Header>{title}</Modal.Header>}
          <Modal.Content style={{ backgroundColor: modalContentBackground, color: 'black' }}>
            {content}
          </Modal.Content>
        </Modal>
      )}
    </div>
  );
};

export default ModalPopup;
