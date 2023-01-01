import DataTable, { ExpanderComponentProps } from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.css";
import moment from "moment";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Layout from "../components/layout";

import axios from "axios";
import React, { useState, useEffect } from "react";

function makeFediLink(name) {
  var output, unArray;

  if (name.charAt(0) == "@") {
    unArray = name.split("@");

    output = "https://" + unArray[2] + "/users/" + unArray[1];
  } else if (name == "Unknown") {
    output = "/info";
  } else {
    output = name;
  }
  return output;
}

const ExpandedComponent = ({ data }) => (
  <Container fluid>
    <Row>
      <Col xs={2} md={2}>
        <b>Homepage:</b>
      </Col>{" "}
      <Col>
        <a href={data.url} target="_blank" rel="noopener noreferrer">
          {data.name}
        </a>
      </Col>
    </Row>
    <Row>
      <Col xs={2} md={2}>
        <b>Admin:</b>
      </Col>{" "}
      <Col>
        <a
          href={makeFediLink(data.moderator)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {data.moderator}
        </a>
      </Col>
    </Row>
    <Row>
      <Col xs={2} md={2}>
        <b>Mastodon:</b>
      </Col>{" "}
      <Col>
        <a href={data.url + "inbox"} target="_blank" rel="noopener noreferrer">
          {data.url}inbox
        </a>
      </Col>
    </Row>
    <Row>
      <Col xs={2} md={2}>
        <b>Pleroma:</b>
      </Col>{" "}
      <Col>
        <a href={data.url + "actor"} target="_blank" rel="noopener noreferrer">
          {data.url}actor
        </a>
      </Col>
    </Row>
    <Row>
      <Col xs={6} md={12}>
        <b>Notes:</b>
        <p>{data.notes}</p>
      </Col>
    </Row>
    <Row>
      <Col>
        <i>Last update {moment.unix(Number(data.updated)).fromNow()}</i>
      </Col>
    </Row>
  </Container>
);

const columns = [
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Address",
    sortable: true,
    cell: (row) => (
      <a href={row.url} target="_blank" rel="noopener noreferrer">
        {row.url.split("/")[2]}
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
        when: (row) => row.openRegistrations == true,
        style: {
          backgroundColor: "rgba(63, 195, 128, 0.9)",
          color: "white",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row) => row.openRegistrations == false,
        style: {
          backgroundColor: "rgba(242, 38, 19, 0.9)",
          color: "white",
          "&:hover": {
            cursor: "not-allowed",
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
        when: (row) => row.up == true,
        style: {
          backgroundColor: "rgba(63, 195, 128, 0.9)",
          color: "white",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      {
        when: (row) => row.up == false,
        style: {
          backgroundColor: "rgba(242, 38, 19, 0.9)",
          color: "white",
          "&:hover": {
            cursor: "not-allowed",
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
      .get("https://api.relaylist.com/relays")
      .then((response) => {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Layout>
        <Row>
          <Alert variant="warning">
            Please add relays with caution!{" "}
            <Alert.Link href="/info">Learn more...</Alert.Link>
          </Alert>
        </Row>
        <Row>
          <DataTable
            columns={columns}
            data={data}
            defaultSortFieldId={3}
            defaultSortAsc={false}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            striped
            bordered
            hover
          />
        </Row>
      </Layout>
    </>
  );
}
