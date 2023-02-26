import styled from 'styled-components';
import { Header, Input, Dropdown } from 'semantic-ui-react';
import { IInputLayout } from './Types';

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
  width: ${(props: any) => (props.stretch ? '100%' : 'auto')};
`;

const StyledBaseDropdown = styled(Dropdown)`
  width: ${(props: any) => (props.stretch === 'true' ? '100%' : 'auto')};
`;

export { StyledInputLayout, StyledInputLabelHeader, StyledBaseInput, StyledBaseDropdown };
