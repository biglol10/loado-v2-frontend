import styled from 'styled-components';

const StyledDiv = styled.div<{
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  backgroundColor?: string;
  border?: string;
  boxShadow?: string;
  color?: string;
  display?: 'flex' | 'grid' | 'block';
  flexDirection?: 'row' | 'column';
  fontSize?: string;
  fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
  gap?: string;
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  height?: string;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  margin?: string;
  marginLeft?: string;
  marginBottom?: string;
  marginRight?: string;
  marginTop?: string;
  padding?: string;
  paddingLeft?: string;
  paddingBottom?: string;
  paddingRight?: string;
  paddingTop?: string;
  textAlign?: 'left' | 'center' | 'right';
  width?: string;
}>`
  align-items: ${(props) => props.alignItems || 'stretch'};
  background-color: ${(props) => props.backgroundColor || 'transparent'};
  border: ${(props) => props.border || 'none'};
  box-shadow: ${(props) => props.boxShadow || 'none'};
  color: ${(props) => props.color || 'inherit'};
  display: ${(props) => `${props.display || 'block'}`};
  flex-direction: ${(props) => `${props.flexDirection || 'row'}`};
  font-size: ${(props) => props.fontSize || 'inherit'};
  font-weight: ${(props) => props.fontWeight || 'normal'};
  gap: ${(props) => props.gap || '0px'};
  grid-template-columns: ${(props) => props.gridTemplateColumns || 'none'};
  grid-template-rows: ${(props) => props.gridTemplateRows || 'none'};
  height: ${(props) => props.height || 'auto'};
  justify-content: ${(props) => props.justifyContent || 'flex-start'};
  margin: ${(props) => `${props.margin || '0px'}`};
  margin-left: ${(props) => `${props.marginLeft || '0px'}`};
  margin-bottom: ${(props) => `${props.marginBottom || '0px'}`};
  margin-right: ${(props) => `${props.marginRight || '0px'}`};
  margin-top: ${(props) => `${props.marginTop || '0px'}`};
  padding: ${(props) => props.padding || '0px'};
  padding-left: ${(props) => `${props.paddingLeft || '0px'}`};
  padding-bottom: ${(props) => `${props.paddingBottom || '0px'}`};
  padding-right: ${(props) => `${props.paddingRight || '0px'}`};
  padding-top: ${(props) => `${props.paddingTop || '0px'}`};
  text-align: ${(props) => props.textAlign || 'left'};
  width: ${(props) => props.width || 'auto'};
`;

const StyledP = styled.p<{
  color?: string;
  fontSize?: string;
  fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
  margin?: string;
  marginLeft?: string;
  marginBottom?: string;
  marginRight?: string;
  marginTop?: string;
  padding?: string;
  paddingLeft?: string;
  paddingBottom?: string;
  paddingRight?: string;
  paddingTop?: string;
  textAlign?: 'left' | 'center' | 'right';
}>`
  color: ${(props) => props.color || 'inherit'};
  font-size: ${(props) => props.fontSize || 'inherit'};
  font-weight: ${(props) => props.fontWeight || 'normal'};
  margin: ${(props) => `${props.margin || '0px'}`};
  margin-left: ${(props) => `${props.marginLeft || '0px'}`};
  margin-bottom: ${(props) => `${props.marginBottom || '0px'}`};
  margin-right: ${(props) => `${props.marginRight || '0px'}`};
  margin-top: ${(props) => `${props.marginTop || '0px'}`};
  padding: ${(props) => props.padding || '0px'};
  padding-left: ${(props) => `${props.paddingLeft || '0px'}`};
  padding-bottom: ${(props) => `${props.paddingBottom || '0px'}`};
  padding-right: ${(props) => `${props.paddingRight || '0px'}`};
  padding-top: ${(props) => `${props.paddingTop || '0px'}`};
  text-align: ${(props) => props.textAlign || 'left'};
`;

const StyledSpan = styled.span<{
  color?: string;
  fontSize?: string;
  fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
  margin?: string;
  marginLeft?: string;
  marginBottom?: string;
  marginRight?: string;
  marginTop?: string;
  padding?: string;
  paddingLeft?: string;
  paddingBottom?: string;
  paddingRight?: string;
  paddingTop?: string;
  textAlign?: 'left' | 'center' | 'right';
}>`
  color: ${(props) => props.color || 'inherit'};
  font-size: ${(props) => props.fontSize || 'inherit'};
  font-weight: ${(props) => props.fontWeight || 'normal'};
  margin: ${(props) => `${props.margin || '0px'}`};
  margin-left: ${(props) => `${props.marginLeft || '0px'}`};
  margin-bottom: ${(props) => `${props.marginBottom || '0px'}`};
  margin-right: ${(props) => `${props.marginRight || '0px'}`};
  margin-top: ${(props) => `${props.marginTop || '0px'}`};
  padding: ${(props) => props.padding || '0px'};
  padding-left: ${(props) => `${props.paddingLeft || '0px'}`};
  padding-bottom: ${(props) => `${props.paddingBottom || '0px'}`};
  padding-right: ${(props) => `${props.paddingRight || '0px'}`};
  padding-top: ${(props) => `${props.paddingTop || '0px'}`};
  text-align: ${(props) => props.textAlign || 'left'};
`;

const StyledHeading = styled.h1<{
  // Change h with the desired heading level like h1, h2, etc.
  color?: string;
  fontSize?: string;
  fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
  margin?: string;
  marginLeft?: string;
  marginBottom?: string;
  marginRight?: string;
  marginTop?: string;
  padding?: string;
  paddingLeft?: string;
  paddingBottom?: string;
  paddingRight?: string;
  paddingTop?: string;
  textAlign?: 'left' | 'center' | 'right';
}>`
  color: ${(props) => props.color || 'inherit'};
  font-size: ${(props) => props.fontSize || 'inherit'};
  font-weight: ${(props) => props.fontWeight || 'normal'};
  margin: ${(props) => `${props.margin || '0px'}`};
  margin-left: ${(props) => `${props.marginLeft || '0px'}`};
  margin-bottom: ${(props) => `${props.marginBottom || '0px'}`};
  margin-right: ${(props) => `${props.marginRight || '0px'}`};
  margin-top: ${(props) => `${props.marginTop || '0px'}`};
  padding: ${(props) => props.padding || '0px'};
  padding-left: ${(props) => `${props.paddingLeft || '0px'}`};
  padding-bottom: ${(props) => `${props.paddingBottom || '0px'}`};
  padding-right: ${(props) => `${props.paddingRight || '0px'}`};
  padding-top: ${(props) => `${props.paddingTop || '0px'}`};
  text-align: ${(props) => props.textAlign || 'left'};
`;

export { StyledDiv, StyledP, StyledSpan, StyledHeading };
