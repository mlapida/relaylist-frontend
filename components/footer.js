import Row from 'react-bootstrap/Row';
import styles from '../styles/Home.module.css'


export default function Footer({ children }) {
    return (
      <>
    <Row><footer className={styles.main}><p>Created by <a rel="me" href="https://mastodon.lapidak.is/@mike">Mike</a> | DM for additions and feedback | <a href="https://empty.coffee/why-i-built-relaylist-mastodon/">About Relay List</a></p></footer>
        </Row>
</>
)
}