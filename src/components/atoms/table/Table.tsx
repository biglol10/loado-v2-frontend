import { Column, useTable } from 'react-table';
import styled from 'styled-components';

const StyledTable = styled.table`
  border-collapse: collapse;
  border: 1px solid white;
  margin: 10px;
  width: 45%;
  float: left;
`;

const StyledHead = styled.thead`
  border-bottom: 1px solid white;
  height: 40px;
`;
const StyledBody = styled.tbody`
  text-align: center;
`;
const StyledRow = styled.tr`
  border-bottom: 1px solid white;
  height: 40px;
  &:last-child {
    border-bottom: none;
  }
`;

const Table = ({ columns, data }: { columns: Column[]; data: any }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <StyledTable {...getTableProps()}>
      <StyledHead>
        {headerGroups.map((headerGroup) => (
          <StyledRow {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} key={column.id}>
                {column.render('Header')}
              </th>
            ))}
          </StyledRow>
        ))}
      </StyledHead>
      <StyledBody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <StyledRow {...row.getRowProps()} key={row.id}>
              {row.cells.map((cell, index) => (
                <td {...cell.getCellProps()} key={index}>
                  {cell.render('Cell')}
                </td>
              ))}
            </StyledRow>
          );
        })}
      </StyledBody>
    </StyledTable>
  );
};

export { Table };
