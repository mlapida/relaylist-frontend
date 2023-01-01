import Navbar from './navbar'
import Footer from './footer'
import Header from './header'
import Title from './title'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.css'
import moment from 'moment';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

export default function Layout({ children }) {
  return (
    <>
    <Header />
    <Container>
    <Title />
    <Navbar />
    <main>{children}</main>
    <Footer />
    </Container>  
    </>
  )
}