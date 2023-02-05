import styled from 'styled-components';
import { Button as SemanticButton } from 'semantic-ui-react';
// import { IButton } from './ButtonTypes';

const StyledButton = styled(SemanticButton)`
  margin-top: ${(props) => props.spacing};
`;

export { StyledButton };
