export function flatten(filter) {
  return function (rows, ids, filterValue) {
    const flatRows = treeToFlat(rows).map((r) => ({
      ...r,
      subRows: [],
      depth: 0,
      xFlat: true,
    }));
    return filter(flatRows, ids, filterValue);
  };
}

function treeToFlat(rows) {
  return [
    ...rows,
    ...rows
      .map((r) => treeToFlat(r.subRows || []))
      .reduce((pre, cur) => [...pre, ...cur], []),
  ];
}

export default function flattenGlobalFilter(columnFormats) {
  return flatten(function globalFilter(rows, ids, filterValue) {
    return rows.filter((r) =>
      ids.some((id) => {
        const format = columnFormats[id];
        if (!format) {
          return false;
        }
        const value = format(r.values[id]);
        return (
          value !== undefined &&
          value !== null &&
          String(value)
            .toLowerCase()
            .includes(String(filterValue).toLowerCase())
        );
      })
    );
  });
}
