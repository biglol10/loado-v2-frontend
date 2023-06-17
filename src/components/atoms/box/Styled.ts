import styled from 'styled-components';
import { IBox } from './ButtonTypes';

const StyledBox = styled.div<IBox>`
  display: block;
  padding: 15px;
  margin-top: ${({ spacing }) => `${spacing}px`};
  background: #f7f9f9;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 300;
  text-align: ${({ textAlign }) => textAlign};
  width: ${({ stretch }) => (stretch ? '100%' : 'auto')};
  border: ${({ boxType }) => {
    if (boxType === 'primary') {
      return '1px solid #aed6f1';
    } else if (boxType === 'error') {
      return '1px solid rgba(235, 61, 79, 0.1)';
    }
    return '1px solid rgba(235, 61, 79, 0.1)';
  }}}
`;

export { StyledBox };
