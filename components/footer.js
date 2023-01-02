import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export default function Footer({ children }) {
  return (
    <>
      <Container>
        <footer>
          <Row className="justify-content-md-center">
            <Col md="auto">
              Created by&nbsp;
              <a rel="me" href="https://mastodon.lapidak.is/@mike">
                Mike
              </a>
            </Col>
            <Col md="auto">DM for additions and feedback</Col>
            <Col md="auto">
              <a href="https://empty.coffee/why-i-built-relaylist-mastodon/">
                About Relay List
              </a>
            </Col>
          </Row>
        </footer>
      </Container>
    </>
  );
}
