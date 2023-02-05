import { Label as SemanticLabel } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledLabel = styled(SemanticLabel)`
  border: ${({ borderNone }) => (borderNone ? 'none' : '')};
  margin-top: ${({ spacing }) => `${spacing}px`};
  color: ${({ color }) => color};
  background: none;
  padding: ${({ paddingNone }) => (paddingNone ? '0px' : 'auto')};
`;

export { StyledLabel };
