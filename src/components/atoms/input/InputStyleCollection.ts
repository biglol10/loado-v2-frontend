import styled from 'styled-components';
import { Header, Input } from 'semantic-ui-react';
import { IInputLayout } from './InputTypes';

const StyledInputLayout = styled.div<IInputLayout>`
  margin-top: ${(props) => props.spacing};
  width: ${(props) => (props.stretch ? '100%' : 'auto')};
`;

const StyledInputLabelHeader = styled(Header)`
  margin-bottom: 15px !important;
  position: relative;
  left: 0%;
`;

const StyledBaseInput = styled(Input)`
  width: ${(props: any) => (props.stretch === 'true' ? '100%' : 'auto')};
`;

export { StyledInputLayout, StyledInputLabelHeader, StyledBaseInput };
