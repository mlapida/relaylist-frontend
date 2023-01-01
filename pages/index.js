import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import DataTable, { ExpanderComponentProps } from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.css'
import moment from 'moment';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import axios from "axios";
import React, {
  useState,
  useEffect
} from "react";

function makeFediLink(name) {
  var output, unArray

  if (name.charAt(0) == "@"){
    
    unArray = name.split("@")

    output = "https://" + unArray[2] + "/users/" + unArray[1]
  }
  else if (name == "Unknown"){
    output = "/info"
  }
  else {
    output = name
  }
  return output;
}

const ExpandedComponent = ({ data }) => 
  <Container fluid>
    <Row><Col><i>Last update {moment.unix(Number(data.updated)).fromNow()}</i></Col></Row>
    <Row><Col xs={2} md={4}><b>Information Page:</b></Col> <Col><a href={data.url}>{data.name}</a></Col></Row>
    <Row><Col xs={2} md={4}><b>Admin:</b></Col> <Col><a href={makeFediLink(data.moderator)} target="_blank" rel="noopener noreferrer">{data.moderator}</a></Col></Row>
    <Row><Col xs={2} md={4}><b>Mastodon:</b></Col> <Col><a href={data.url+"inbox" } target="_blank" rel="noopener noreferrer">
      {data.url}inbox
    </a></Col></Row>
    <Row><Col xs={2} md={4}><b>Pleroma:</b></Col> <Col><a href={data.url+"actor" } target="_blank" rel="noopener noreferrer">
      {data.url}actor</a></Col></Row>
    <Row><Col xs={6} md={12}><b>Notes:</b><p>{data.notes}</p></Col></Row>
  </Container>;

const columns = [
  {
    name: "Name",
    selector: row => row.name,
    sortable: true,
  },
  {
    name: "Address",
    sortable: true,
    cell: (row) => (
      <a href={row.url} target="_blank" rel="noopener noreferrer">
        {row.url}
      </a>
    ),
  },
  {
    name: "Participants",
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
];

export default function Home() {

  const [data, setData, updateAt] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.relaylist.com/relays"
      )
      .then(response => {
        setData(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Relay List - Connecting the Fediverse</title>
        <meta name="description" content="A regularly updated list of relays for use with Mastodon, Misskey, Pleroma and other ActivityPub servers." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <meta property="og:url" content="https://relaylist.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Relay List - Connecting the Fediverse" />
        <meta property="og:description" content="A regularly updated list of relays for use with Mastodon, Misskey, Pleroma and other ActivityPub servers." />
        <meta property="og:image" content="/train.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="relaylist.com" />
        <meta property="twitter:url" content="https://relaylist.com" />
        <meta name="twitter:title" content="Relay List - Connecting the Fediverse" />
        <meta name="twitter:description" content="A regularly updated list of relays for use with Mastodon, Misskey, Pleroma and other ActivityPub servers." />
        <meta name="twitter:image" content="/train.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      <Container>
      <Row><h1 className={styles.title}>RelayList.com</h1></Row>
        <Row><p>A list of relays that can be added to a Mastodon, Misskey, or Pleroma server.</p></Row>
        <Row><Alert variant="warning">Please add relays with caution! <Alert.Link href="/info">Learn more...</Alert.Link></Alert></Row>
        <Row><DataTable columns={columns} data={data} defaultSortFieldId={3} defaultSortAsc={false} expandableRows expandableRowsComponent={ExpandedComponent} 
            striped bordered hover/></Row>
      <Row><footer className={styles.main}><p>Created by <a rel="me" href="https://mastodon.lapidak.is/@mike">Mike</a> | DM for additions and feedback | <a href="https://empty.coffee/why-i-built-relaylist-mastodon/">About Relay List</a></p></footer>
      </Row>
      </Container>
      </main>
    </>
  );
}
