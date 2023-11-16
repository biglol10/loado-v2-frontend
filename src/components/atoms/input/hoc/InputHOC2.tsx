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
  InputDefaultWithNumber,
  InputHOCRefMainType,
  InputSearchType,
  InputWithIconProps,
  InputWithIconProps2,
} from '../Types';

type InputTypeOverall = InputDefaultProps &
  InputWithIconProps2 &
  InputDefaultWithNumber &
  InputSearchType;

interface InputProps extends Omit<InputTypeOverall, 'onChange'> {
  onChange?: (value: string) => void;
}

const InputHoc2 = (WrappedComponent: React.FC<InputTypeOverall>) => {
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
          // // eslint-disable-next-line no-debugger
          // debugger;
          debounce(() => {
            onChange?.(value);
          }, 50)();
        };

        // // eslint-disable-next-line no-debugger
        // debugger;

        const isInputNumber = WrappedComponent.displayName === 'InputDefaultNumber';

        if (isInputNumber) {
          const regex = /^[\d,]*$/;
          const isMatch = regex.test(e.target.value);

          if (!isMatch) {
            setInputValue('');
            onChangeDebounce();
          } else {
            setInputValue(Number(e.target.value.replaceAll(',', '')).toLocaleString());

            console.log(`datavalue is ${data.value.toLocaleString()}`);

            onChangeDebounce(data.value.toLocaleString());
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
      <WrappedComponent
        {...props} // 순서 중요!!
        ref={inputRef}
        value={inputValue}
        onChange={onChangeFn}
      />
    );
  };

  return forwardRef(WithInput);
};

export default InputHoc2;

// // props: P & ICommInput
// const InputHoc = <P extends object>(OriginalComponent: React.ComponentType<P>) => {
//   return forwardRef((props: { value: string; onChange: any; multiple: any }, ref: any) => {
//     const [inputValue, setInputValue] = useState<any>(props.value);
//     const inputRef = useRef<Input>();

//     const { onChange } = props;

//     useEffect(() => {
//       !isEqual(inputValue, props.value) && setInputValue(props.value);
//     }, [props.value]);

//     const onChangeFn = useCallback(
//       (e: ChangeEvent<HTMLInputElement>, data: any = null) => {
//         const isDropdown = OriginalComponent.displayName === 'InputDropdown';
//         const isInputNumber = OriginalComponent.displayName === 'InputDefaultNumber';

//         if (isInputNumber) {
//           const regex = /^[\d,]*$/;
//           const isMatch = regex.test(e.target.value);

//           if (!isMatch) {
//             setInputValue('');
//             debounce(() => {
//               onChange &&
//                 onChange({
//                   value: '',
//                 });
//             }, 50)();
//           } else {
//             setInputValue(Number(e.target.value.replaceAll(',', '')).toLocaleString());

//             debounce(() => {
//               onChange &&
//                 onChange({
//                   value: e.target.value, // at this time of point, the input value which is e.target.value is formatted with comma
//                 });
//             }, 50)();
//           }
//           return;
//         }

//         setInputValue(!isDropdown ? e.target.value : data.value);

//         debounce(() => {
//           onChange &&
//             onChange({
//               value: !isDropdown ? e.target.value : data.value,
//             });
//         }, 50)();
//       },
//       [onChange],
//     );

//     useImperativeHandle(ref, () => ({
//       inputElement: inputRef.current,
//       clear: () => {
//         if (OriginalComponent.displayName === 'InputDropdown') {
//           setInputValue(props.multiple ? [] : '');
//         } else setInputValue('');
//       },
//     }));

//     return (
//       <OriginalComponent
//         {...props} // 순서 중요!!
//         ref={inputRef}
//         value={inputValue}
//         onChange={onChangeFn}
//       />
//     );
//   });
// };

// InputHoc.displayName = 'InputHoc';
