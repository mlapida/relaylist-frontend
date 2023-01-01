import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.css";

import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Layout from "../components/layout";

export default function Home() {
  return (
    <>
      <Layout>
        <Alert variant="info">Under Construction</Alert>
      </Layout>
    </>
  );
}
