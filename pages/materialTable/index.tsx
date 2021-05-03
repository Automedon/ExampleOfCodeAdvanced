import React from "react";
import styled from "styled-components";
import MaterialTable, {
  MTableBodyRow,
  MTableHeader,
  MTableToolbar,
  MTableCell,
} from "material-table";
import { Resizable } from "re-resizable";
//import { Resizable, ResizableBox } from "react-resizable";
import styles from "./Table.module.css";

const Material = () => {
  return (
    <>
      {" "}
      <StyledTable>
        <MaterialTable
          title={null}
          components={{
            Toolbar: (props) => {
              return <MTableToolbar {...props} />;
            },
            Row: (props) => {
              const changeBackGround = !!props?.data?.name;

              return (
                <StyledRow {...props} $changeBackground={changeBackGround} />
              );
            },
            Header: (props) => {
              return <StyledHeader {...props} />;
            },
            Cell: (props) => {
              return <MTableCell {...props} />;
            },
          }}
          data={[
            {
              id: 1,
              name: "Key Staff",
              surname: null,
              birthYear: null,
              birthCity: null,
              sex: null,
              type: null,
            },
            {
              id: 2,
              name: "Ivan Megan",
              user: { avatar: "avatar" },
              surname: null,
              birthYear: null,
              birthCity: null,
              sex: null,
              type: null,
              parentId: 1,
            },
            {
              id: 3,
              name: "Mikhail Surta",
              surname: null,
              user: { avatar: "avatar" },
              birthYear: null,
              birthCity: null,
              sex: null,
              type: null,
              parentId: 1,
            },
            {
              id: 4,
              name: null,
              surname: "Baran",
              birthYear: 1987,
              birthCity: 34,
              sex: "Female",
              type: "child",
              parentId: 3,
            },
            {
              id: 5,
              name: null,
              surname: "Baran",
              birthYear: 1987,
              birthCity: 34,
              sex: "Female",
              type: "child",
              parentId: 2,
            },
          ]}
          columns={[
            { title: "Name", field: "name" },
            { title: "Surname", field: "surname" },
            { title: "Sex", field: "sex" },
            { title: "Type", field: "type", removable: false },
            { title: "BirthYear", field: "birthYear", type: "numeric" },
            {
              title: "BirthCity",
              field: "birthCity",
              lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
            },
          ]}
          options={{
            paging: false,
            searchFieldStyle: { color: "red" },
            searchFieldAlignment: "left",
            draggable: false,
          }}
          parentChildData={(row, rows) =>
            rows.find((a) => a.id === row.parentId)
          }
        />
      </StyledTable>
    </>
  );
};

const StyledRow = styled(MTableBodyRow)<{
  $changeBackground?: boolean;
}>`
  background-color: ${({ $changeBackground }) =>
    $changeBackground ? "red" : "green"};
`;

const StyledTable = styled.div<{}>`
  width: 1200px;
  display: flex;
  justify-items: center;
`;

const StyledHeader = styled(MTableHeader)`
  width: 100%;
  * {
    color: orange !important;
  }
`;

export default Material;
