import { Image as SemanticImage } from 'semantic-ui-react';

interface IImage {
  id?: string;
  className?: string;
  src: string;
  alt?: string;
  type: 'image' | 'a';
  imageSize: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive';
  href?: string;
  target?: '_blank';
  hidden?: boolean;
  bordered?: boolean;
  centered?: boolean;
  floated?: 'left' | 'right' | '';
  circular?: boolean;
}

const Image = ({
  id,
  className,
  src,
  type,
  imageSize,
  href,
  target,
  alt = '',
  hidden = false,
  bordered = false,
  centered = false,
  floated = '',
  circular = false,
}: IImage) => {
  return (
    <SemanticImage
      id={id}
      className={className}
      src={src}
      alt={alt}
      type={type}
      size={imageSize}
      href={href}
      target={target}
    />
  );
};

export default Image;
