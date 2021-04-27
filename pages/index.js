import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import List from "../components/List";
import AddItem from "../components/AddItem";
import { GlobalContext } from "../context/GlobalContextProvider";

export default function Home() {
  const { lists, setLists } = useContext(GlobalContext);

  useEffect(() => {
    async function getLists() {
      const res = await fetch("http://localhost:3000/api/lists");
      const { data } = await res.json();
      setLists(data);
    }
    getLists();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Trollo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.grid}>
        {lists.map((list, index) => {
          return (
            <div key={`${(list.name, index)}`}>
              <List list={list} setLists={setLists} lists={lists} />
            </div>
          );
        })}
        <div className={styles.list}>
          <AddItem item={lists} setItem={setLists} type="list" />
        </div>
      </main>
    </div>
  );
}

// export async function getServerSideProps() {
//   const res = await fetch(`http://localhost:3000/api/lists/`);
//   const { data } = await res.json();
//   return { props: { defaultLists: data } };
// }
