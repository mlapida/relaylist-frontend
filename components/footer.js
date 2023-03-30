import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Github, Mastodon } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";

export default function Footer({ children }) {
  return (
    <>
      <Container>
        <footer>
          <Row className="justify-content-md-center">
            <Col md="auto">
              Created by:{" "}
              <a rel="me" href="https://me.dm/@mike">
                <Mastodon /> Mike
              </a>
            </Col>
            <Col md="auto">DM for additions and feedback</Col>
            <Col md="auto">
              <a href="https://empty.coffee/why-i-built-relaylist-mastodon/">
                About Relay List
              </a>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md="auto">
              <Button
                href="https://github.com/mlapida/relaylist-frontend"
                variant="light"
              >
                <Github /> Frontend
              </Button>
            </Col>
            <Col md="auto">
              <Button
                href="https://github.com/mlapida/relaylist-api"
                variant="light"
              >
                <Github /> Backend
              </Button>
            </Col>
          </Row>
        </footer>
      </Container>
    </>
  );
}
