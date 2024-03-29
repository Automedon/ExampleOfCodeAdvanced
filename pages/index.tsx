import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href={"/about"}>About Pagee</Link>
      <Link href={"/tablepage"}>Table Page</Link>
      <Link href={"/select"}>Select Page</Link>
      <Link href={"/tablesub"}>Table sub</Link>
      <Link href={"/materialTable"}>Material Table</Link>
      <Link href={"/antdTable"}>Antd Table</Link>
      <Link href={"/tableSuit"}>Suit Table</Link>
      <Link href={"/devTable"}>Dev Table</Link>
      <Link href={"/primeTable"}>Prime Table</Link>
      <Link href={"/ReactDataGrid"}>ReactDataGrid</Link>
      <Link href={"/rsuitTable"}>RsuitTable</Link>
    </div>
  );
}
