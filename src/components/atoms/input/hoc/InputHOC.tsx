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
import { Input, InputProps as SemanticInputProps } from 'semantic-ui-react';
import { InputHOCRefMainType } from '../Types';

interface InputProps {
  value: string | number | object;
  onChange?: (e: any) => void;
  multiple?: boolean;
}

const InputHoc = (
  WrappedComponent: React.ForwardRefExoticComponent<Partial<SemanticInputProps>>,
) => {
  const WithInput = (props: InputProps | SemanticInputProps, ref: InputHOCRefMainType) => {
    const [inputValue, setInputValue] = useState<string | number | object>(props.value);
    const inputRef = useRef<Input>();

    const { onChange } = props as InputProps;

    useEffect(() => {
      !isEqual(inputValue, props.value) && setInputValue(props.value);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.value]);

    const onChangeFn = useCallback(
      (e: ChangeEvent<HTMLInputElement>, data: any = null) => {
        // alert('I am in onChangeFn');
        const isDropdown = WrappedComponent.displayName === 'InputDropdown';
        const isInputNumber = WrappedComponent.displayName === 'InputDefaultNumber';

        if (isInputNumber) {
          const regex = /^[\d,]*$/;
          const isMatch = regex.test(e.target.value);

          if (!isMatch) {
            setInputValue('');
            debounce(() => {
              onChange && onChange('');
            }, 50)();
          } else {
            setInputValue(Number(e.target.value.replaceAll(',', '')).toLocaleString());

            debounce(() => {
              onChange && onChange(e.target.value); // at this time of point, the input value which is e.target.value is formatted with comma
            }, 50)();
          }
          return;
        }

        setInputValue(!isDropdown ? e.target.value : data.value);

        debounce(() => {
          onChange && onChange(!isDropdown ? e.target.value : data.value);
        }, 50)();
      },
      [onChange],
    );

    useImperativeHandle(ref, () => ({
      inputElement: inputRef.current,
      clear: () => {
        if (WrappedComponent.displayName === 'InputDropdown') {
          setInputValue(props.multiple ? [] : '');
        } else setInputValue('');
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

export default InputHoc;

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
