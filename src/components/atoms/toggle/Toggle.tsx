import { useEffect, useState } from 'react';
import { StyledToggle } from './Styled';
import { IToggle } from './Types';

const Toggle = ({ id = '', className = '', onClick = null, on = false, spacing = 0 }: IToggle) => {
  const [isOn, setIsOn] = useState<boolean>(on);

  const onClickFn = () => {
    setIsOn((prev) => !prev);
  };

  useEffect(() => {
    onClick &&
      onClick({
        isOn,
      });
  }, [isOn, onClick]);

  return (
    <>
      <StyledToggle
        className={className}
        toggle
        id={id}
        onClick={onClickFn}
        checked={isOn}
        spacing={spacing}
      />
    </>
  );
};

Toggle.displayName = 'Toggle';

export default Toggle;
