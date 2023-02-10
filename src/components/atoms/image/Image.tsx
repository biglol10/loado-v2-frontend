import { Image as SemanticImage, SemanticFLOATS } from 'semantic-ui-react';
import { loaImages } from '@consts/imgSrc';

interface IImage {
  id?: string;
  className?: string;
  src?: keyof typeof loaImages | string | null;
  alt?: string;
  type: 'image' | 'a';
  imageSize: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive';
  href?: string;
  target?: '_blank';
  hidden?: boolean;
  bordered?: boolean;
  centered?: boolean;
  floated?: SemanticFLOATS | undefined;
  circular?: boolean;
}

const Image = ({
  id,
  className,
  src = '',
  type,
  imageSize,
  href,
  target,
  alt = '',
  hidden = false,
  bordered = false,
  centered = false,
  floated = undefined,
  circular = false,
}: IImage) => {
  const imgSrc =
    src && Object.prototype.hasOwnProperty.call(loaImages, src)
      ? loaImages[src as keyof typeof loaImages]
      : src;

  return (
    <SemanticImage
      id={id}
      className={className}
      src={imgSrc}
      alt={alt}
      type={type}
      size={imageSize}
      href={href}
      target={target}
      hidden={hidden}
      bordered={bordered}
      centered={!floated && centered}
      floated={floated}
      circular={circular}
    />
  );
};

export default Image;
