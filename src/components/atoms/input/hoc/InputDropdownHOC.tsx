/* eslint-disable react/display-name */
import React, { useState, useCallback, SyntheticEvent } from 'react';

interface ICommInput {
  value?: string;
  onChange?: Function;
}

const InputDropdownHOC = <P extends object>(OriginalComponent: React.ComponentType<P>) => {
  return (props: P & ICommInput) => {
    const [dropdownValue, setDropdownValue] = useState<string | string[]>(props.value || '');

    const { onChange } = props;

    const onChangeFn = useCallback(
      (e: SyntheticEvent<HTMLElement, Event>, data: any) => {
        setDropdownValue(data.value);
        onChange &&
          onChange({
            value: data.value,
          });
      },
      [onChange],
    );

    return <OriginalComponent {...props} value={dropdownValue} onChange={onChangeFn} />;
  };
};

InputDropdownHOC.displayName = 'InputDropdownHOC';

export default InputDropdownHOC;
