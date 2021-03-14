import React from "react";
import Head from "next/head";
import Table from "./Table/Table";

export default function Index() {
  return (
    <div>
      <Head>
        <title>Table Page</title>
      </Head>
      <Table />
    </div>
  );
}
