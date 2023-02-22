import { Icon, Label as SemanticLabel } from 'semantic-ui-react';
import styled from 'styled-components';

import { ILabel } from './Types';

const StyledLabel = styled(SemanticLabel)`
  border: ${({ borderNone }) => (borderNone ? 'none' : '')};
  margin-top: ${({ spacing }) => `${spacing}px`};
  color: ${({ color }) => color};
  background: ${({ backgroundNone }) => (backgroundNone === 'Y' ? 'none !important' : 'none')}
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
  backgroundNone = 'N',
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
      backgroundNone={backgroundNone}
    >
      {content}
      {iconOrImage === 'icon' && icon}
      {iconOrImage === 'image' && nextImage}
    </StyledLabel>
  );
};

export default Label;
