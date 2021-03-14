import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { usePagination, useSortBy, useTable } from "react-table";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { getPokemonsz, pokemonsUrl } from "./api";
import { Pokemon } from "./types";
import { hiddenColumns } from "./utils";
import Pagination from "./Pagination/Pagination";
import { tablePaginationAtom } from "./atom";

export default function Table() {
  const [{ offset, limit }] = useRecoilState(tablePaginationAtom);

  const { data: pokemonszData, isLoading } = useQuery<
    { count: number; pokemons: Pokemon[] },
    Error
  >([pokemonsUrl, limit, offset], getPokemonsz);

  const data = React.useMemo(
    () =>
      pokemonszData?.pokemons?.map(
        ({ name, base_experience, height, id, weight }) => {
          return {
            name,
            base_experience,
            height,
            id,
            weight,
          };
        }
      ) || [],
    [pokemonszData?.pokemons]
  );

  const setPageCount2 = React.useMemo(
    () => Math.floor(pokemonszData?.count! / limit),
    [pokemonszData?.count]
  );
  const columns = React.useMemo(() => {
    if (pokemonszData?.pokemons) {
      const Headers = Object.keys(pokemonszData?.pokemons[0]);
      return Headers.map((header) => ({
        Header: header,
        accessor: header.toLowerCase(),
      })) as any;
    }
  }, [pokemonszData?.pokemons]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      pageCount: setPageCount2,
      columns,
      data,
      initialState: { pageIndex: 0, hiddenColumns },
      manualPagination: true,
      autoResetPage: false,
    },
    useSortBy,
    usePagination
  );
  const loading = isLoading && <div>Loading...</div>;

  return (
    <div>
      {loading}
      Table Page
      <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    borderBottom: "solid 3px red",
                    background: "aliceblue",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : " ↕"}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        background: "papayawhip",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageOptions={pageOptions}
        pageCount={pageCount}
        gotoPage={gotoPage}
        nextPage={nextPage}
        previousPage={previousPage}
        setPageSize={setPageSize}
        pageIndex={pageIndex}
        pageSize={pageSize}
      />
    </div>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();
  const { offset, limit } = useRecoilValue(tablePaginationAtom);
  await queryClient.prefetchQuery([pokemonsUrl, limit, offset], getPokemonsz);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
