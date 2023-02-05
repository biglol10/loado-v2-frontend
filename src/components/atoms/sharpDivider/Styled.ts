import styled from 'styled-components';

const StyledSharpDivider = styled.div<{ dividerColor: string }>`
  display: flex;
  font-size: 24px;
  text-align: center;
  width: 100%;
  margin: 25px auto;
  align-items: center;
  user-select: none;

  span {
    display: table-cell;
    position: relative;
  }

  span:first-child,
  span:last-child {
    width: 50%;
    -moz-background-size: 100% 2px;
    background-size: 100% 2px;
    background-position: 0 0, 0 100%;
    background-repeat: no-repeat;
    height: 2px;
  }

  span:first-child {
    background-image: ${({ dividerColor }) =>
      `-webkit-gradient(linear, 0 0, 0 100%, from(transparent), to(${dividerColor}))`};
    background-image: ${({ dividerColor }) =>
      `-webkit-linear-gradient(180deg, transparent, ${dividerColor})`};
    background-image: ${({ dividerColor }) =>
      `-moz-linear-gradient(180deg, transparent, ${dividerColor})`};
    background-image: ${({ dividerColor }) =>
      `-o-linear-gradient(180deg, transparent, ${dividerColor})`};
    background-image: ${({ dividerColor }) =>
      `linear-gradient(90deg, transparent, ${dividerColor})`};
  }

  span:nth-child(2) {
    color: #839192;
    padding: 0px 5px;
    width: auto;
    white-space: nowrap;
    font-size: 12px;
  }

  span:last-child {
    background-image: ${({ dividerColor }) =>
      `-webkit-gradient(linear, 0 0, 0 100%, from(${dividerColor}), to(transparent))`};
    background-image: ${({ dividerColor }) =>
      `-webkit-linear-gradient(180deg, ${dividerColor}, transparent)`};
    background-image: ${({ dividerColor }) =>
      `-moz-linear-gradient(180deg, ${dividerColor}, transparent)`};
    background-image: ${({ dividerColor }) =>
      `-o-linear-gradient(180deg, ${dividerColor}, transparent)`};
    background-image: ${({ dividerColor }) =>
      `linear-gradient(90deg, ${dividerColor}, transparent)`};
  }
`;

export { StyledSharpDivider };
