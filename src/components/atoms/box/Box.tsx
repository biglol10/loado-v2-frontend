/** ****************************************************************************************
 * @설명 : Button component
 ********************************************************************************************
 * 번호    작업자     작업일         브랜치                       변경내용
 *-------------------------------------------------------------------------------------------
 * 1      변지욱     2023-02-05   main                       최초작성
 ********************************************************************************************/

import { IBox } from './ButtonTypes';
import { StyledBox } from './Styled';

const Box = ({
  id,
  children,
  boxType = 'basic',
  textAlign = 'left',
  className = '',
  spacing = 0,
  onClick,
  stretch = false,
}: IBox) => {
  return (
    <StyledBox
      id={id}
      className={className}
      onClick={onClick && onClick}
      // stretch={stretch ? 'stretch' : ''}
      stretch={stretch}
      spacing={spacing}
      textAlign={textAlign}
      boxType={boxType}
    >
      {children}
    </StyledBox>
  );
};

export default Box;
