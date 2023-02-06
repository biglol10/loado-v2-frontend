/* eslint-disable react/display-name */
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

        setInputValue(!isDropdown ? e.target.value : data.value);
        onChange &&
          onChange({
            value: !isDropdown ? e.target.value : data.value,
          });
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
