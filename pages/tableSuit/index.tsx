import React from "react";
import { Icon, Table } from "rsuite";
import fakeTreeData from "./fakeData.json";

const { Column, HeaderCell, Cell, Pagination } = Table;

const TreeTable = () => {
  return (
    <div>
      <Table
        isTree
        defaultExpandAllRows
        rowKey="id"
        height={400}
        data={fakeTreeData}
        onExpandChange={(isOpen, rowData) => {
          console.log(isOpen, rowData);
        }}
        renderTreeToggle={(icon, rowData) => {
          if (rowData.children && rowData.children.length === 0) {
            return <Icon icon="spinner" spin />;
          }
          return icon;
        }}
      >
        <Column flexGrow={1}>
          <HeaderCell>Label</HeaderCell>
          <Cell dataKey="labelName" />
        </Column>

        <Column width={100}>
          <HeaderCell>Status</HeaderCell>
          <Cell dataKey="status" />
        </Column>

        <Column width={100}>
          <HeaderCell>Count</HeaderCell>
          <Cell dataKey="count" />
        </Column>
      </Table>
    </div>
  );
};

export default TreeTable;
