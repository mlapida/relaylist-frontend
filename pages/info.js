import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.css'

import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Home() {

  return (
    <>
      <Head>
        <title>Relay List - About</title>
        <meta name="description" content="A regularly updated list of relays for use with Mastodon, Misskey, Pleroma and other ActivityPub servers." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <meta property="og:url" content="https://relaylist.com/info" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Relay List - Connecting the Fediverse" />
        <meta property="og:description" content="A regularly updated list of relays for use with Mastodon, Misskey, Pleroma and other ActivityPub servers." />
        <meta property="og:image" content="/train.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="relaylist.com" />
        <meta property="twitter:url" content="https://relaylist.com/info" />
        <meta name="twitter:title" content="Relay List - Connecting the Fediverse" />
        <meta name="twitter:description" content="A regularly updated list of relays for use with Mastodon, Misskey, Pleroma and other ActivityPub servers." />
        <meta name="twitter:image" content="/train.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      <Container>
      <Row><h1 className={styles.title}>RelayList.com</h1></Row>
        <Alert variant="info">Under Construction</Alert>
      <footer className={styles.main}><p>Created by <a rel="me" href="https://mastodon.lapidak.is/@mike">Mike</a> | DM for additions and feedback | <a href="https://empty.coffee/why-i-built-relaylist-mastodon/">About Relay List</a></p></footer>
      </Container>
      </main>
    </>
  );
}
