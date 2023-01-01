import Head from "next/head";

export default function Header({ children }) {
  return (
    <>
      <Head>
        <title>Relay List - Connecting the Fediverse</title>
        <meta
          name="description"
          content="A regularly updated list of relays for use with Mastodon, Misskey, Pleroma and other ActivityPub servers."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:url" content="https://relaylist.com" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Relay List - Connecting the Fediverse"
        />
        <meta
          property="og:description"
          content="A regularly updated list of relays for use with Mastodon, Misskey, Pleroma and other ActivityPub servers."
        />
        <meta property="og:image" content="/train.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="relaylist.com" />
        <meta property="twitter:url" content="https://relaylist.com" />
        <meta
          name="twitter:title"
          content="Relay List - Connecting the Fediverse"
        />
        <meta
          name="twitter:description"
          content="A regularly updated list of relays for use with Mastodon, Misskey, Pleroma and other ActivityPub servers."
        />
        <meta name="twitter:image" content="/train.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
