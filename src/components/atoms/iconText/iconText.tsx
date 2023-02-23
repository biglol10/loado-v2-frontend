import styled from 'styled-components';
import { Image } from '@components/index';
import { loaImages } from '@consts/imgSrc';

type IconTextProps = {
  text: string;
  url?: string;
};

const IconText = (props: IconTextProps) => {
  const { text, url } = props;

  return (
    <div>
      {text}
      <Image src={loaImages['골드배경X']} imageSize="mini" type="image" circular={true} />
    </div>
  );
};

export { IconText };
