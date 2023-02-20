import { Icon, Label as SemanticLabel } from 'semantic-ui-react';
import styled from 'styled-components';

import { ILabel } from './Types';

const StyledLabel = styled(SemanticLabel)`
  border: ${({ borderNone }) => (borderNone ? 'none' : '')};
  margin-top: ${({ spacing }) => `${spacing}px`};
  color: ${({ color }) => color};
  background: none;
  padding: ${({ paddingNone }) => (paddingNone ? '0px' : 'auto')};
`;

const Label = ({
  basic = true,
  className = '',
  content = '',
  iconOrImage = 'none',
  icon = <Icon name="arrow alternate circle right outline" />,
  nextImage,
  color = 'black',
  borderNone = true,
  size = 'small',
  spacing = 0,
  paddingNone = false,
}: ILabel) => {
  return (
    <StyledLabel
      color={color}
      className={className}
      basic={basic}
      image={iconOrImage === 'image'}
      size={size}
      borderNone={borderNone}
      spacing={spacing}
      paddingNone={paddingNone}
    >
      {iconOrImage === 'icon' && icon}
      {iconOrImage === 'image' && nextImage}
      {content}
    </StyledLabel>
  );
};

export default Label;
