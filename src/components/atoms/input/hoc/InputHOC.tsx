/* eslint-disable react/display-name */
import React, { useState, useCallback, ChangeEvent, forwardRef } from 'react';

interface ICommInput {
  value?: string;
  onChange?: Function;
}

const InputHoc = <P extends object>(OriginalComponent: React.ComponentType<P>) => {
  return forwardRef((props: P & ICommInput, ref) => {
    const [inputValue, setInputValue] = useState(props.value);

    const { onChange } = props;

    const onChangeFn = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        onChange &&
          onChange({
            value: e.target.value,
          });
      },
      [onChange],
    );

    return <OriginalComponent ref={ref} value={inputValue} {...props} onChange={onChangeFn} />;
  });
};

InputHoc.displayName = 'InputHoc';

export default InputHoc;
