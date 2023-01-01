import Row from "react-bootstrap/Row";
import styles from "../styles/Home.module.css";

export default function Title({ children }) {
  return (
    <>
      <Row>
        <h1 className={styles.title}>RelayList.com</h1>
      </Row>
      <Row>
        <p>
          A list of relay servers that can be added to a Mastodon, Misskey, or
          Pleroma instance.
        </p>
      </Row>
    </>
  );
}
