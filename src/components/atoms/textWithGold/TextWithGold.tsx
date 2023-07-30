import styled from 'styled-components';
import { loaImages } from '@consts/imgSrc';

type TextWithGoldProps = {
  text: string;
  width?: string;
};

const StyledSpan = styled.span`
  color: white;
`;

const StyledImage = styled.img`
  vertical-align: inherit;
  width: ${(props) => (props.width ? props.width : 'auto')};
`;

const TextWithGold = (props: TextWithGoldProps) => {
  const { text, width } = props;

  return (
    <>
      <StyledImage src={loaImages['골드배경X']} width={width} />
      <StyledSpan>{text}</StyledSpan>
    </>
  );
};

export { TextWithGold };
