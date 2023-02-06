import React from 'react';
import { List as SemanticList } from 'semantic-ui-react';
import styled from 'styled-components';
import { IList } from './Types';

const StyledListItem = styled(SemanticList.Item)`
  margin: 8px 0px;
`;

const List = ({
  id = '',
  items,
  listType = 'none',
  verticalAlign = 'middle',
  className = '',
}: IList) => {
  return (
    <SemanticList
      id={id}
      bulleted={listType === 'buletted'}
      ordered={listType === 'ordered'}
      verticalAlign={verticalAlign}
    >
      {items.map((item: { content: React.ReactElement | string }, idx: number) => {
        return (
          <StyledListItem key={`${id}_listItem_${idx}`} className={className}>
            {item.content}
          </StyledListItem>
        );
      })}
    </SemanticList>
  );
};

export default List;
