import React from "react";
import Head from "next/head";
import { useTable } from "react-table";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { getPokemonsz } from "./api";
import { Pokemon } from "./types";

export default function Index() {
  const { data: pokemonszData, isLoading } = useQuery<Pokemon[], Error>(
    "pokemonsz",
    getPokemonsz
  );
  const data = React.useMemo(
    () =>
      pokemonszData?.map(({ name, base_experience, height, ...pok }) => {
        return {
          name,
          base_experience,
          height,
        };
      }) || [],
    [pokemonszData]
  );

  const columns = React.useMemo(() => {
    if (pokemonszData) {
      const Headers = Object.keys(pokemonszData[0]);
      return Headers.map((header) => ({
        Header: header,
        accessor: header.toLowerCase(),
      }));
    }

    return [];
  }, [pokemonszData]) as any;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });
  const loading = isLoading && <div>Loading...</div>;

  return (
    <div>
      <Head>
        <title>Table Page</title>
      </Head>
      {loading}
      Table Page
      <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
        <thead>
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 3px red",
                    background: "aliceblue",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
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
    </div>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("pokemonsz", getPokemonsz);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
