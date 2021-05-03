import React from "react";
import {
  useTable,
  useExpanded,
  useFilters,
  Row,
  useFlexLayout,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";

import { Border } from "./style";

const Table = ({ columns, data }) => {
  const globalFilter = React.useCallback(
    (rows: Row[], columnIds: any, searchQuery: string) => {
      if (!searchQuery) return rows;

      const lowercaseQuery = searchQuery.toLowerCase();
      const rowMatches = (row): boolean =>
        Object.values(row.values).some(
          (rowValue) =>
            typeof rowValue === "string" &&
            rowValue.toLowerCase().includes(lowercaseQuery)
        ) || row.subRows?.some(rowMatches);
      console.log(rows.filter(rowMatches));
      return rows.filter(rowMatches);
    },
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
    toggleRowExpanded,
    getToggleAllRowsExpandedProps,
  } = useTable(
    {
      columns,
      data,
      globalFilter,
      getSubRows: (row: any) => row.subRows,
      // manualFilters: true,
    },
    //useFilters,
    useGlobalFilter,
    useExpanded,
    useFlexLayout
  );
  return (
    <Border>
      <button
        onClick={() => {
          toggleRowExpanded("0");
          toggleRowExpanded("0.0");
        }}
      >
        Taggle
      </button>
      <button
        onClick={() => {
          getToggleAllRowsExpandedProps();
        }}
      >
        Taggle2
      </button>

      <table {...getTableProps()}>
        <thead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <th {...column.getHeaderProps()}>
                      {
                        // Render the header
                        column.render("Header")
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        <GlobalFilter
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
          preGlobalFilteredRows={preGlobalFilteredRows}
        />
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);

              if (row.canExpand) {
                return (
                  <tr {...row.getRowProps()}>
                    <td
                      colSpan={visibleColumns.length}
                      {...row.getToggleRowExpandedProps()}
                    >
                      Expand {row.original.swim1}
                    </td>
                  </tr>
                );
              }
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </Border>
  );
};

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = (value) => {
    setGlobalFilter(value || undefined);
  };

  return (
    <span>
      Search:{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: "1.1rem",
          border: "0",
        }}
      />
    </span>
  );
}

export { Table };
