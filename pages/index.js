import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import List from "../components/List";
import AddItem from "../components/AddItem";

export default function Home() {
  const [lists, setLists] = useState([]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Trollo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.grid}>
        {lists.map((list) => {
          return <List list={list} key={list} />;
        })}
        <div className={styles.list}>
          <AddItem item={lists} setItem={setLists} type="list" />
        </div>
      </main>
    </div>
  );
}
