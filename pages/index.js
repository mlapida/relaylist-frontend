import DataTable, { ExpanderComponentProps } from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.css";
import moment from "moment";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Layout from "../components/layout";
import Accordion from "react-bootstrap/Accordion";
import {
  InfoCircleFill,
  ExclamationCircleFill,
  ExclamationTriangleFill,
} from "react-bootstrap-icons";

import axios from "axios";
import React, { useState, useEffect, useMemo, useCallback } from "react";

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

function regStatus(reg) {
  var output;

  if (reg == true) {
    output = "open";
  } else {
    output = "closed";
  }
  return output;
}

function onlineStatus(reg) {
  var output;

  if (reg == true) {
    output = "up";
  } else {
    output = "down";
  }
  return output;
}

const ExpandedComponent = React.memo(({ data }) => (
  <Container fluid role="region" aria-label={`Detailed information for ${data.name} relay`}>
    <Row>
      <Col xs={3} md={2}>
        <strong>Homepage:</strong>
      </Col>
      <Col>
        <a href={data.url} target="_blank" rel="noopener noreferrer"
           aria-label={`Visit ${data.name} homepage (opens in new tab)`}>
          {data.name}
        </a>
      </Col>
    </Row>
    <Row>
      <Col xs={3} md={2}>
        <strong>Admin:</strong>
      </Col>
      <Col>
        <a
          href={makeFediLink(data.moderator)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Contact admin ${data.moderator} (opens in new tab)`}
        >
          {data.moderator}
        </a>
      </Col>
    </Row>
    <Row>
      <Col xs={3} md={2}>
        <strong>Mastodon endpoint:</strong>
      </Col>
      <Col>
        <a href={data.url + "inbox"} target="_blank" rel="noopener noreferrer"
           aria-label={`Mastodon inbox endpoint for ${data.name} (opens in new tab)`}>
          {data.url}inbox
        </a>
      </Col>
    </Row>
    <Row>
      <Col xs={3} md={2}>
        <strong>Pleroma endpoint:</strong>
      </Col>
      <Col>
        <a href={data.url + "actor"} target="_blank" rel="noopener noreferrer"
           aria-label={`Pleroma actor endpoint for ${data.name} (opens in new tab)`}>
          {data.url}actor
        </a>
      </Col>
    </Row>
    <Row>
      <Col xs={6} md={12}>
        <strong>Notes:</strong>
        <p>{data.notes || 'No additional notes available'}</p>
      </Col>
    </Row>
    <Row>
      <Col>
        <small className="text-muted">
          Last updated {moment.unix(Number(data.updated)).fromNow()}
        </small>
      </Col>
    </Row>
  </Container>
));

ExpandedComponent.displayName = 'ExpandedComponent';

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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRelays = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get API URL from environment variable with fallback
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.relaylist.com';
      const apiUrl = `${apiBaseUrl}/relays`;
      
      const response = await axios.get(apiUrl);
      
      // Validate response data
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error('Invalid data format received from API');
      }
      
      // Basic validation for required fields
      const validatedData = response.data.filter(relay => 
        relay && 
        typeof relay.name === 'string' && 
        typeof relay.url === 'string' &&
        relay.url.startsWith('http')
      );
      
      setData(validatedData);
    } catch (err) {
      setError('Failed to load relay data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRelays();
  }, [fetchRelays]);

  // Memoize columns to prevent recreation on every render
  const memoizedColumns = useMemo(() => columns, []);

  return (
    <>
      <Layout>
        <header>
          <Row>
            <Col></Col>
            <Col xs={10}>
              <Alert variant="warning" role="alert" aria-live="polite">
                <ExclamationTriangleFill aria-hidden="true" />
                &nbsp;Please add relays with caution!
              </Alert>
            </Col>
            <Col></Col>
          </Row>
        </header>
        <section aria-labelledby="info-section">
          <Row>
            <Col></Col>
            <Col xs={10}>
              <h1 className="visually-hidden" id="info-section">Information about Relay List</h1>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <InfoCircleFill aria-hidden="true" />
                    &nbsp;What is Relay List?
                  </Accordion.Header>
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
                    DM <a href="https://lapidak.is/@mike">Mike</a> to have
                    relays added, fields updates, or removal and moderation
                    requests.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              {/* <Accordion.Item eventKey="1">
                <Accordion.Header>
                <InfoCircleFill />&nbsp;Adding a relay to your server
                </Accordion.Header>
                <Accordion.Body>Coming soon.</Accordion.Body>
              </Accordion.Item> */}
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  <ExclamationTriangleFill />
                  &nbsp;Considerations before adding
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                    As an administrator of an ActivityPub server, such as
                    Mastodon, there are important considerations to be made
                    before adding a relay. It&apos;s essential to know that
                    relays replicate all local content from all participating
                    servers to your server. There are costs associated with this
                    action. You should always add relays with caution!
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
                    <li>Increased moderation responsibilities</li>
                  </ul>
                  <p>
                    Finally, the participants number does not directly correlate
                    with the load adding a relay cause. It is best to review the
                    servers participating to gauge activity. For instance,
                    relays that have a few large, very active servers subscribed
                    will impact your server&apos;s resources more than relays
                    that have numerous small servers subscribed.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col></Col>
        </Row>
        </section>
        <main aria-labelledby="relay-table-heading">
          <Row>
            <Col>
              <h2 className="visually-hidden" id="relay-table-heading">ActivityPub Relay Directory</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              {error && (
                <Alert variant="danger" role="alert" aria-live="assertive">
                  <ExclamationCircleFill aria-hidden="true" />
                  &nbsp;{error}
                </Alert>
              )}
              <div className="card"
                   role="region" 
                   aria-labelledby="relay-table-heading"
                   aria-describedby="relay-table-description">
                <div id="relay-table-description" className="visually-hidden">
                  Sortable table of ActivityPub relays showing name, address, participant count, registration status, and online status. Click on any row to expand for more details.
                </div>
                <DataTable
                  columns={memoizedColumns}
                  data={data}
                  defaultSortFieldId={3}
                  defaultSortAsc={false}
                  expandableRows
                  expandOnRowClicked
                  expandableRowsComponent={ExpandedComponent}
                  striped
                  bordered
                  hover
                  progressPending={loading}
                  progressComponent={
                    <div role="status" aria-live="polite">
                      Loading relay data...
                    </div>
                  }
                />
              </div>
            </Col>
          </Row>
        </main>
      </Layout>
    </>
  );
}
