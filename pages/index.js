import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import DataTable, { createTheme } from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.css'
import moment from 'moment';

import axios from "axios";
import React, {
  useState,
  useEffect
} from "react";

const inter = Inter({ subsets: ['latin'] })

const columns = [
  {
    name: "Name",
    //selector: row => row.name,
    cell: (row) => (
      <a href={row.url} target="_blank" rel="noopener noreferrer">
        {row.name}
      </a>
    ),
  },
  {
    name: "Servers",
    selector: (row) => Number(row.server_count),
    sortable: true,
  },
  {
    name: "Registration",
    selector: (row) => row.openRegistrations.toString(),
    sortable: true,
    conditionalCellStyles: [
			{
				when: row => row.openRegistrations == true ,
				style: {
					backgroundColor: 'rgba(63, 195, 128, 0.9)',
					color: 'white',
					'&:hover': {
						cursor: 'pointer',
					},
				},
			},
			{
				when: row => row.openRegistrations == false,
				style: {
					backgroundColor: 'rgba(242, 38, 19, 0.9)',
					color: 'white',
					'&:hover': {
						cursor: 'not-allowed',
					},
				},
			},
		],
  },
  {
    name: "Online",
    selector: (row) => row.up.toString(),
    sortable: true,
    conditionalCellStyles: [
			{
				when: row => row.up == true ,
				style: {
					backgroundColor: 'rgba(63, 195, 128, 0.9)',
					color: 'white',
					'&:hover': {
						cursor: 'pointer',
					},
				},
			},
			{
				when: row => row.up == false,
				style: {
					backgroundColor: 'rgba(242, 38, 19, 0.9)',
					color: 'white',
					'&:hover': {
						cursor: 'not-allowed',
					},
				},
			},
		],
  },
  {
    name: "Last Updated",
    sortable: true,
    cell: (row) => (
        moment.unix(Number(row.updated)).fromNow()
    ),
  },
];


export default function Home() {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.relaylist.com/relays"
      )
      .then(response => {
        setData(response.data);
        console.log(data)
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Relay List - Connecting the Fediverse</title>
        <meta name="description" content="A list of relays for use with Mastodon and other ActivityPubs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Relay List for the Fediverse</h1>
        <p>This is a list of relays to add to your Mastsodon server</p>
        <DataTable columns={columns} data={data} defaultSortFieldId={2} striped bordered hover/>
      <footer className={styles.main}><p>Created by <a href="https://lap.social/@mike">Mike Lapidakis</a></p></footer>
      </main>
    </>
  );
}
