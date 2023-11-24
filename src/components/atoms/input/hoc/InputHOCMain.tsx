import React, {
  useState,
  useCallback,
  ChangeEvent,
  forwardRef,
  useRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import { debounce, isEqual } from 'lodash';
import { Input, InputOnChangeData } from 'semantic-ui-react';
import {
  InputDefaultProps,
  InputDefaultNumberProps,
  InputHOCRefMainType,
  InputSearchType,
  InputWithIconProps,
} from '../Types';

type InputTypeOverall = InputDefaultProps &
  InputWithIconProps &
  InputDefaultNumberProps &
  InputSearchType;

interface InputProps extends Omit<InputTypeOverall, 'onChange'> {
  onChange?: (value: string) => void;
}

const InputHOCMain = (InputComponent: React.FC<InputTypeOverall>) => {
  const WithInput = (props: InputProps, ref: InputHOCRefMainType) => {
    const [inputValue, setInputValue] = useState<string>(props.value || '');
    const inputRef = useRef<Input>();

    const { onChange } = props;

    useEffect(() => {
      !isEqual(inputValue, props.value) && setInputValue(props.value || '');
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.value]);

    const onChangeFn = useCallback(
      (e: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        const onChangeDebounce = (value: string = '') => {
          debounce(() => {
            onChange?.(value);
          }, 50)();
        };

        const isInputNumber = InputComponent.displayName === 'InputDefaultNumber';

        if (isInputNumber) {
          const regex = /^[\d,]*$/;
          const isMatch = regex.test(e.target.value);

          if (!isMatch) {
            setInputValue('');
            onChangeDebounce();
          } else {
            const numberWithComma = Number(data.value.replaceAll(',', '')).toLocaleString();

            setInputValue(numberWithComma);

            onChangeDebounce(numberWithComma);
          }
          return;
        }

        setInputValue(data.value);

        onChangeDebounce(data.value);
      },
      [onChange],
    );

    useImperativeHandle(ref, () => ({
      inputElement: inputRef.current,
      clear: () => {
        setInputValue('');
      },
    }));

    return (
      <InputComponent
        {...props} // 순서 중요!!
        ref={inputRef}
        value={inputValue}
        onChange={onChangeFn}
      />
    );
  };

  return forwardRef(WithInput);
};

export default InputHOCMain;
