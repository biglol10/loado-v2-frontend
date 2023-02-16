/* eslint-disable react/display-name */
import { debounce } from 'lodash';
import React, {
  useState,
  useCallback,
  ChangeEvent,
  forwardRef,
  useRef,
  useImperativeHandle,
} from 'react';
import { Input } from 'semantic-ui-react';

interface ICommInput {
  value?: string;
  onChange?: Function;
}

// props: P & ICommInput
const InputHoc = <P extends object>(OriginalComponent: React.ComponentType<P>) => {
  return forwardRef((props: any, ref: any) => {
    const [inputValue, setInputValue] = useState(props.value);
    const inputRef = useRef<Input>();

    const { onChange } = props;

    const onChangeFn = useCallback(
      (e: ChangeEvent<HTMLInputElement>, data: any = null) => {
        const isDropdown = OriginalComponent.displayName === 'InputDropdown';
        const isInputNumber = OriginalComponent.displayName === 'InputDefaultNumber';

        if (isInputNumber) {
          const regex = /^[0-9]+$/;
          const isMatch = regex.test(e.target.value);

          if (!isMatch) {
            setInputValue('');
            debounce(() => {
              onChange &&
                onChange({
                  value: '',
                });
            }, 50)();
          } else {
            setInputValue(e.target.value);

            debounce(() => {
              onChange &&
                onChange({
                  value: e.target.value,
                });
            }, 50)();
          }
          return;
        }

        setInputValue(!isDropdown ? e.target.value : data.value);

        debounce(() => {
          onChange &&
            onChange({
              value: !isDropdown ? e.target.value : data.value,
            });
        }, 50)();
      },
      [onChange],
    );

    useImperativeHandle(ref, () => ({
      inputElement: inputRef.current,
      clear: () => {
        if (OriginalComponent.displayName === 'InputDropdown') {
          setInputValue(props.multiple ? [] : '');
        } else setInputValue('');
      },
    }));

    return (
      <OriginalComponent
        {...props} // 순서 중요!!
        ref={inputRef}
        value={inputValue}
        onChange={onChangeFn}
      />
    );
  });
};

InputHoc.displayName = 'InputHoc';

export default InputHoc;
