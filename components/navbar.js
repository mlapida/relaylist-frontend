import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';


export default function Navbar({ children }) {
    return (
      <>
<Row>
    <Nav activeKey="/">
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/info">Information</Nav.Link>
        </Nav.Item>
    </Nav>
</Row>
</>
)
}