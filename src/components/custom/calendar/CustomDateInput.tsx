import { forwardRef, ForwardRefRenderFunction } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #282c34;
  color: white;
  cursor: pointer;
  width: 240px;
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid white;
  border-radius: 5px;
`;

interface CustomDateInputProps {
  value: string;
  onClick: () => void;
}

const CustomDateInput: ForwardRefRenderFunction<HTMLButtonElement, CustomDateInputProps> = (
  { value, onClick },
  ref,
) => (
  <StyledButton className="example-custom-input" onClick={onClick} ref={ref}>
    {value}
  </StyledButton>
);

export default forwardRef(CustomDateInput);
