import React from "react";
import { useSetRecoilState } from "recoil";
import { PaginationProps } from "./types";
import { tablePaginationAtom } from "../atom";

const Pagination = ({
  pageSize,
  setPageSize,
  gotoPage,
  canPreviousPage,
  previousPage,
  nextPage,
  canNextPage,
  pageCount,
  pageIndex,
  pageOptions,
}: PaginationProps) => {
  const setPagination = useSetRecoilState(tablePaginationAtom);

  const updateRecoilPage = (page: number) =>
    setPagination((currVal) => ({
      ...currVal,
      offset: currVal.limit * page,
    }));

  return (
    <div className="pagination">
      <button
        onClick={() => {
          gotoPage(0);
          updateRecoilPage(pageIndex);
        }}
        disabled={!canPreviousPage}
      >
        {"<<"}
      </button>{" "}
      <button
        onClick={() => {
          previousPage();
          updateRecoilPage(pageIndex - 1);
        }}
        disabled={!canPreviousPage}
      >
        {"<"}
      </button>{" "}
      <button
        onClick={() => {
          nextPage();
          updateRecoilPage(pageIndex + 1);
        }}
        disabled={!canNextPage}
      >
        {">"}
      </button>{" "}
      <button
        onClick={() => {
          {
            gotoPage(pageCount - 1);
            updateRecoilPage(pageCount - 1);
          }
        }}
        disabled={!canNextPage}
      >
        {">>"}
      </button>{" "}
      <span>
        Page{" "}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{" "}
      </span>
      <span>
        | Go to page:{" "}
        <input
          type="number"
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(page);
            updateRecoilPage(page);
          }}
          style={{ width: "100px" }}
        />
      </span>{" "}
      <select
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
          setPagination((currVal) => ({
            ...currVal,
            limit: Number(e.target.value),
          }));
        }}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
