import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { getTasks, getInvoices } from "./api";
import Table from "./components/table";
import columns from "./components/columns";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [invoices, setInvoices] = useState([]);

  function handleCLick() {
    getInvoices().then((result) => {
      let invoices = result.data;
      console.log(invoices);
    });
  }

  useEffect(() => {
    let mounted = true;
    getTasks()
      .then((result) => {
        if (mounted) {
          let tasks = result.data;
          setTasks(tasks);
          console.log(columns);
        }
      })
      .catch((error) => console.log(error));
    return () => (mounted = false);
  }, []);
  return (
    <div>
      <div>
        <h1>Tasks</h1>
        <Link href="/create">
          <button>Create</button>
        </Link>

        <div>
          <Table columns={columns} data={tasks} />
        </div>
      </div>
    </div>
  );
}
