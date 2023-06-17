import { Image as SemanticImage, SemanticFLOATS } from 'semantic-ui-react';
import { loaImages, loaImagesType } from '@consts/imgSrc';

interface ImageProps {
  id?: string;
  className?: string;
  src?: loaImagesType | string | null;
  alt?: string;
  type: 'image' | 'a';
  imageSize: 'mini' | 'tiny' | 'small' | 'medium' | 'large' | 'big' | 'huge' | 'massive';
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
}: ImageProps) => {
  const imgSrc =
    src && Object.prototype.hasOwnProperty.call(loaImages, src)
      ? loaImages[src as loaImagesType]
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
