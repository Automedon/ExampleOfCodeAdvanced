import React from "react";
import { Table } from "./Table";

const TableSub = () => {
  const data = React.useMemo(
    () => [
      {
        swim1: "Hello",
        subRows: [
          {
            swim2: "World",
            subRows: [
              {
                col1: "Rock",
                col2: "Solid",
              },
            ],
          },
        ],
      },
    ],
    []
  );
  const columns = React.useMemo(
    () => [
      {
        Header: "Swim 1",
        id: "swim1",
        accessor: "swim1", // accessor is the "key" in the data
        Cell: ({ row }) => {
          // Use Cell to render an expander for each row.
          // We can use the getToggleRowExpandedProps prop-getter
          // to build the expander.
          let symbol = "👉";
          if (row.isExpanded) {
            symbol = "👇";
          }
          if (!row.canExpand) {
            symbol = "";
          }
          return (
            <span
              {...row.getToggleRowExpandedProps({
                style: {
                  // We can even use the row.depth property
                  // and paddingLeft to indicate the depth
                  // of the row
                  paddingLeft: `${row.depth * 1.5}rem`,
                },
              })}
            >
              {symbol}
            </span>
          );
        },
      },
      {
        Header: "Column 1",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Column 2",
        accessor: "col2",
      },
    ],
    []
  );
  return <Table data={data} columns={columns} />;
};

export default TableSub;
