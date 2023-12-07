// ! not used (InputHoc로 통합)

/* eslint-disable react/display-name */
import React, {
  useState,
  useCallback,
  SyntheticEvent,
  forwardRef,
  useRef,
  useImperativeHandle,
} from 'react';
import { Dropdown } from 'semantic-ui-react';
import { DropdownHOCRefMainType, InputDropdownProps } from '../Types';

interface ICommInput {
  value?: string;
  onChange?: Function;
}

interface DropdownProps extends Omit<InputDropdownProps, 'onChange'> {
  onChange?: (value: string) => void;
}

const InputDropdownHOC = (DropdownComponent: React.FC<InputDropdownProps>) => {
  const WithDropdown = (props: DropdownProps, ref: DropdownHOCRefMainType) => {
    const [dropdownValue, setDropdownValue] = useState<string>(props.value ?? '');
    const dropdownRef = useRef<HTMLSelectElement>(null);

    const { onChange } = props;

    const onChangeFn = useCallback(
      (e: SyntheticEvent<HTMLElement, Event>, data: any) => {
        setDropdownValue(data.value);
        onChange && onChange(`${data.value}`);
      },
      [onChange],
    );

    useImperativeHandle(ref, () => ({
      dropdownElement: dropdownRef.current,
      clear: () => {
        setDropdownValue('');
      },
    }));

    return (
      <DropdownComponent {...props} ref={dropdownRef} value={dropdownValue} onChange={onChangeFn} />
    );
  };

  return forwardRef(WithDropdown);
};

// const InputDropdownHOC = <P extends object>(OriginalComponent: React.ComponentType<P>) => {
//   return forwardRef((props: P & ICommInput, ref) => {
//     const [dropdownValue, setDropdownValue] = useState<string | string[]>(props.value || '');
//     const dropdownRef = useRef<typeof Dropdown>();

//     const { onChange } = props;

//     const onChangeFn = useCallback(
//       (e: SyntheticEvent<HTMLElement, Event>, data: any) => {
//         setDropdownValue(data.value);
//         onChange &&
//           onChange({
//             value: data.value,
//           });
//       },
//       [onChange],
//     );

//     useImperativeHandle(ref, () => ({
//       dropdownElement: dropdownRef.current,
//       clear: () => {
//         console.log(props);
//       },
//     }));

//     return (
//       <OriginalComponent {...props} ref={dropdownRef} value={dropdownValue} onChange={onChangeFn} />
//     );
//   });
// };

InputDropdownHOC.displayName = 'InputDropdownHOC';

export default InputDropdownHOC;
