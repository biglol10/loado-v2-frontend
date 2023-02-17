import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Content = styled.div<{ isOpen: boolean }>`
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  position: absolute;
  z-index: 1;
  top: 100%;
  // left: 50%;
  // transform: translateX(-50%);
  width: max-content;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 10px;
  border-radius: 6px;
  opacity: 0.9;
  transition: opacity 0.3s;
`;

type TooltipProps = {
  children: ReactElement;
  tooltipContent: string | ReactElement;
};

export default function Tooltip({ children, tooltipContent }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <Content isOpen={isOpen}>{tooltipContent}</Content>
      {children}
    </Wrapper>
  );
}

// import React, { useState, ReactNode } from "react";
// import styled from "styled-components";

// const TooltipContainer = styled.div`
//   position: relative;
//   display: inline-block;
//   cursor: help;
// `;

// const TooltipText = styled.span`
//   visibility: hidden;
//   width: max-content;
//   background-color: #000;
//   color: #fff;
//   text-align: center;
//   padding: 5px;
//   border-radius: 6px;
//   position: absolute;
//   z-index: 1;
//   bottom: 100%;
//   left: 50%;
//   transform: translateX(-50%);
//   opacity: 0;
//   transition: opacity 0.3s;

//   ${({ visible }: { visible: boolean }) =>
//     visible && "visibility: visible; opacity: 1;"};
// `;

// interface Props {
//   children: ReactNode;
//   content: ReactNode;
// }

// const Tooltip = ({ children, content }: Props) => {
//   const [visible, setVisible] = useState(false);

//   const handleMouseEnter = () => {
//     setVisible(true);
//   };

//   const handleMouseLeave = () => {
//     setVisible(false);
//   };

//   return (
//     <TooltipContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
//       {children}
//       <TooltipText visible={visible} style={{ left: `calc(50% + ${content.toString().length * 2}px)` }}>
//         {content}
//       </TooltipText>
//     </TooltipContainer>
//   );
// };

// export default Tooltip;
