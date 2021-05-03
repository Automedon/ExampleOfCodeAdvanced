import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import {
  TreeDataState,
  CustomTreeData,
  SearchState,
  IntegratedFiltering,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableTreeColumn,
  SearchPanel,
  Toolbar,
} from "@devexpress/dx-react-grid-material-ui";

import { generateRows, defaultColumnValues } from "./generator";

const getChildRows = (row, rootRows) => (row ? row.items : rootRows);

const TableZ = () => {
  const [columns] = useState([
    { name: "name", title: "Name" },
    { name: "gender", title: "Gender" },
    { name: "city", title: "City" },
    { name: "car", title: "Car" },
  ]);
  const [searchValue, setSearchState] = useState("Female");
  const [data] = useState(
    generateRows({
      columnValues: {
        ...defaultColumnValues,
        items: ({ random }) =>
          random() > 0.5
            ? generateRows({
                columnValues: {
                  ...defaultColumnValues,
                  items: () =>
                    random() > 0.5
                      ? generateRows({
                          columnValues: {
                            ...defaultColumnValues,
                          },
                          length: Math.trunc(random() * 5) + 1,
                          random,
                        })
                      : null,
                },
                length: Math.trunc(random() * 3) + 1,
                random,
              })
            : null,
      },
      length: 3,
    })
  );
  const [tableColumnExtensions] = useState([
    { columnName: "name", width: 300 },
  ]);

  return (
    <Paper>
      <Grid rows={data} columns={columns}>
        <TreeDataState />
        <SearchState value={searchValue} onValueChange={setSearchState} />
        <IntegratedFiltering />
        <CustomTreeData getChildRows={getChildRows} />
        <Table columnExtensions={tableColumnExtensions} />
        <TableHeaderRow />
        <TableTreeColumn for="name" />
        <Toolbar />
        <SearchPanel />
      </Grid>
    </Paper>
  );
};

export default TableZ;
