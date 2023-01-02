import DataTable, { ExpanderComponentProps } from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.css";
import moment from "moment";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Layout from "../components/layout";
import Accordion from "react-bootstrap/Accordion";

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

function regStatus(reg){
  var output 

  if (reg == true){
    output = "open"
  } else {
    output = "closed"
  }
  return output;
}

function onlineStatus(reg){
  var output 

  if (reg == true){
    output = "up"
  } else {
    output = "down"
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
    selector: (row) => regStatus(row.openRegistrations),
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
    selector: (row) => onlineStatus(row.up),
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
          <Col></Col>
          <Col xs={10}>
            <Alert variant="warning">Please add relays with caution!</Alert>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col xs={10}>
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>What is Relay List?</Accordion.Header>
                <Accordion.Body>
                  <p>
                    Relay List is a site that indexes and tracks various
                    ActivityPub relays that have been shared with the public or
                    with the creator. Each relay is checked every 30 minutes,
                    updating the number of participating servers, the
                    registration status, and if the relay is online. This
                    information is useful for server administrators when
                    considering adding a relay to their instance.
                  </p>
                  <p>
                    DM <a href="">Mike</a> to have relays added, fields updates,
                    or removal and moderation requests.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  Adding a relay to your server
                </Accordion.Header>
                <Accordion.Body>Coming soon.</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  Considerations before adding
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                    As an administrator of an ActivityPub server, such as
                    Mastodon, there are important considerations to be made
                    before adding a relay. It&apos;s essential to know that relays
                    replicate all local content from all participating servers
                    to your server. There are costs associated with this action.
                    You should always add relays with caution!
                  </p>
                  <p>
                    <strong>Pros:</strong>
                  </p>
                  <ul>
                    <li>
                      Increased activity in the federated feed of your server
                    </li>
                    <li>Improved hashtag results for users</li>
                    <li>
                      Expanded reach for users as posts are sent to all
                      participants in subscribed relays
                    </li>
                  </ul>
                  <p>
                    <strong>Cons:</strong>
                  </p>
                  <ul>
                    <li>Increased media storage requirements and cost</li>
                    <li>Increased resource demands</li>
                    <li>
                      Cost and performance of smaller deployments may be
                      negatively impacted
                    </li>
                  </ul>
                  <p>
                    Finally, the participants number does not directly correlate
                    with the load adding a relay cause. It is best to review the
                    servers participating to gauge activity. For instance,
                    relays that have a few large, very active servers subscribed
                    will impact your server&apos;s resources more than relays that
                    have numerous small servers subscribed. 
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col></Col>
        </Row>
        <Row><p></p></Row>
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
