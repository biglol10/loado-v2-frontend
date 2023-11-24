import React, {
  useState,
  useCallback,
  forwardRef,
  useRef,
  useImperativeHandle,
  useEffect,
  ComponentType,
} from 'react';
import { debounce, isEqual } from 'lodash';
import { Input, InputOnChangeData, StrictInputProps } from 'semantic-ui-react';
import { InputHOCRefMainType } from '../Types';

// Define the new onChange type
interface NewOnChangeProp {
  value?: string | number;
  onChangeHoc?: (value: string) => void;
}

// Define the props for the new input, excluding the onChange prop from Semantic UI's InputProps
export type NewInputProps = Omit<StrictInputProps, 'onChange'> & NewOnChangeProp;

// This function takes a component...
const InputHoc = <T,>(WrappedComponent: ComponentType<T & NewInputProps>) => {
  const WithExtraPropsComponent = (props: T & NewInputProps, ref: InputHOCRefMainType) => {
    // Extract the custom onChange and the rest of the props
    const { onChangeHoc, ...restProps } = props;

    const [inputValue, setInputValue] = useState<string | number>(props.value || '');
    const inputRef = useRef<Input>();

    useEffect(() => {
      props.value && !isEqual(inputValue, props.value) && setInputValue(props.value);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.value]);

    // Create a new onChange handler that conforms to the desired signature
    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        const onChangeDebounce = (value: string = '') => {
          debounce(() => {
            onChangeHoc?.(value);
          }, 50)();
        };

        // Call the provided onChange with just the value from the input
        if (onChangeHoc) {
          const isInputNumberComponent = WrappedComponent.displayName === 'InputDefaultNumber';

          if (isInputNumberComponent) {
            const regex = /^[\d,]*$/;
            const isMatch = regex.test(data.value);

            if (!isMatch) {
              setInputValue('');
              onChangeDebounce();
            } else {
              setInputValue(Number(data.value.replaceAll(',', '')).toLocaleString());
              onChangeDebounce(data.value);
            }
            return;
          }

          setInputValue(data.value);
          onChangeDebounce(data.value);
        }
      },
      [onChangeHoc],
    );

    useImperativeHandle(ref, () => ({
      inputElement: inputRef.current,
      clear: () => {
        setInputValue('');
      },
    }));

    // ... and renders the wrapped component with the new onChange handler and the extra prop
    return <WrappedComponent {...(restProps as T)} ref={ref} onChange={handleChange} />;
  };

  return forwardRef(WithExtraPropsComponent);
};

export default InputHoc;
