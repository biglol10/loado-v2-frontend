import { StyledSharpDivider } from './Styled';
import { ISharpDivider } from './Types';

const SharpDivider = ({
  content = '',
  className = '',
  dividerColor = '#839192',
  fontSize = 12,
}: ISharpDivider) => {
  return (
    <StyledSharpDivider className={className} dividerColor={dividerColor}>
      <span></span>
      <span style={{ display: `${!content} ? 'hidden' : 'auto`, fontSize: `${fontSize}px` }}>
        {content}
      </span>
      <span></span>
    </StyledSharpDivider>
  );
};

export default SharpDivider;
