import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navigation from "./navbar";
import Stack from "react-bootstrap/Stack";

export default function Title({ children }) {
  return (
    <>
      <Stack gap={3}>
        <div>
          <Navigation />
        </div>
        <div></div>
      </Stack>
    </>
  );
}
