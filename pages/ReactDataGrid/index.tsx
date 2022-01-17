import React from "react";
import { useMemo } from "react";
import { useReducer } from "react";
import DataGrid from "react-data-grid";
import { Row } from "./types";
import { createRows, reducer } from "./utils";

const columns = [
  { key: "id", name: "ID" },
  { key: "title", name: "Title" },
];

const rows = [
  { id: 0, title: "Example" },
  { id: 1, title: "Demo" },
];

const defaultRows = createRows();

const newDataGrid = () => {
  const [rows, dispatch] = useReducer(reducer, defaultRows);
  const columns: any[] = useMemo(() => {
    return [
      {
        key: "id",
        name: "id",
        frozen: true,
      },
      {
        key: "name",
        name: "Name",
      },
      {
        key: "format",
        name: "format",
        formatter({ row, isCellSelected }) {
          const hasChildren = row.children !== undefined;
          const style = !hasChildren ? { marginLeft: 30 } : undefined;
          return (
            <>
              {hasChildren && (
                <div
                  style={{
                    width: 25,
                    height: 25,
                    backgroundColor: row.isExpanded ? "red" : "green",
                  }}
                  onClick={() => dispatch({ id: row.id, type: "toggleSubRow" })}
                />
              )}
            </>
          );
        },
      },
      {
        key: "position",
        name: "position",
      },
      {
        key: "price",
        name: "price",
      },
    ];
  }, []);
  return <DataGrid columns={columns} rows={rows} />;
};

export default newDataGrid;
