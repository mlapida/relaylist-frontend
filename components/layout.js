import Navigation from "./navbar";
import Footer from "./footer";
import Header from "./header";
import Title from "./title";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Container>
        <Title />
        <main>{children}</main>
        <Footer />
      </Container>
    </>
  );
}
