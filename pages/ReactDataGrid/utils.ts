import { Action, Row } from "./types";

export function createRows(): Row[] {
  const rows = [];
  for (let i = 0; i < 100; i++) {
    const price = Math.random() * 30;
    const id = `row${i}`;
    const row: Row = {
      id,
      name: `supplier ${i}`,
      format: `package ${i}`,
      position: "Run of site",
      price,
      children: [
        {
          id: `${id}-0`,
          parentId: id,
          name: `supplier ${i}`,
          format: "728x90",
          position: "run of site",
          price: price / 2,
        },
        {
          id: `${id}-1`,
          parentId: id,
          name: `supplier ${i}`,
          format: "480x600",
          position: "run of site",
          price: price * 0.25,
        },
        {
          id: `${id}-2`,
          parentId: id,
          name: `supplier ${i}`,
          format: "328x70",
          position: "run of site",
          price: price * 0.25,
        },
      ],
      isExpanded: false,
    };
    rows.push(row);
  }
  return rows;
}

export function toggleSubRow(rows: Row[], id: string): Row[] {
  const rowIndex = rows.findIndex((r) => r.id === id);
  const row = rows[rowIndex];
  const { children } = row;
  if (!children) return rows;

  const newRows = [...rows];
  newRows[rowIndex] = { ...row, isExpanded: !row.isExpanded };
  if (!row.isExpanded) {
    newRows.splice(rowIndex + 1, 0, ...children);
  } else {
    newRows.splice(rowIndex + 1, children.length);
  }
  return newRows;
}

export function reducer(rows: Row[], { type, id }: Action): Row[] {
  switch (type) {
    case "toggleSubRow":
      return toggleSubRow(rows, id);
    default:
      return rows;
  }
}
