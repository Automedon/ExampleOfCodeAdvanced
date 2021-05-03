import React from "react";
import { Table } from "./Table";

const TableSub = () => {
  const data = React.useMemo(
    () => [
      {
        swim1: "Hello",
        subRows: [
          {
            swim1: "World",
            subRows: [
              {
                col1: "Rock",
                col2: "Solid",
                subRows: [],
              },
            ],
          },
        ],
      },
      {
        swim1: "HelMega",
        subRows: [
          {
            swim1: "WorMega",
            subRows: [
              {
                col1: "RockMega",
                col2: "SolidMega",
                subRows: [],
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
        width: 250,
        accessor: "swim1", // accessor is the "key" in the data,
        Filter: (...props) => {
          console.log(props);
          return <div>Filter</div>;
        },
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
        width: 250,
        accessor: "col1", // accessor is the "key" in the data
        Filter: () => null,
        disableGlobalFilter: true,
      },
      {
        Header: "Column 2",
        accessor: "col2",
        width: 250,
        Filter: () => <div>Hello</div>,
        disableGlobalFilter: true,
      },
    ],
    []
  );
  return <Table data={data} columns={columns} />;
};

export default TableSub;
