import React from "react";
import MaterialTable from "material-table";

export default () => {
  return (
    <MaterialTable
      title="Basic Tree Data Preview"
      data={[
        {
          id: 1,
          name: "a",
          surname: "Baran",
          birthYear: 1987,
          birthCity: 63,
          sex: "Male",
          type: "adult",
        },
        {
          id: 2,
          name: "b",
          surname: "Baran",
          birthYear: 1987,
          birthCity: 34,
          sex: "Female",
          type: "adult",
          parentId: 1,
        },
        {
          id: 3,
          name: "c",
          surname: "Baran",
          birthYear: 1987,
          birthCity: 34,
          sex: "Female",
          type: "child",
          parentId: 1,
        },
        {
          id: 4,
          name: "d",
          surname: "Baran",
          birthYear: 1987,
          birthCity: 34,
          sex: "Female",
          type: "child",
          parentId: 3,
        },
        {
          id: 5,
          name: "e",
          surname: "Baran",
          birthYear: 1987,
          birthCity: 34,
          sex: "Female",
          type: "child",
        },
        {
          id: 6,
          name: "f",
          surname: "Baran",
          birthYear: 1987,
          birthCity: 34,
          sex: "Female",
          type: "child",
          parentId: 5,
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
      parentChildData={(row, rows) => rows.find((a) => a.id === row.parentId)}
    />
  );
};
