/** ****************************************************************************************
 * @설명 : Button component
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2023-02-05   main                       최초작성
 ********************************************************************************************/

import { IButton } from './Types';
import { StyledButton } from './Styled';
// import Style from './Button.module.scss';

const Button = ({
  className = '',
  buttonType = 'primary',
  content = '',
  basic = false,
  color = 'grey',
  size = 'mini',
  loading = false,
  onClick = undefined,
  spacing = 0,
  disabled = false,
}: IButton) => {
  const isPrimary = buttonType === 'primary';
  const isSecondary = buttonType === 'secondary';

  return (
    <StyledButton
      className={className}
      primary={isPrimary}
      secondary={isSecondary}
      content={content}
      basic={basic}
      color={color}
      size={size}
      loading={loading}
      onClick={onClick && onClick}
      // style={{ '--spacing': `${spacing}px` }}
      disabled={disabled}
      spacing={spacing}
    />
  );
};

export default Button;
