import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FiShoppingCart } from "react-icons/fi";
import "./navbar.css";

import logo from "../images/Logo.png"
import { Link } from 'react-router-dom';
import ProfileLogout from './Logout';
import { useEffect, useState } from 'react';

const MenuBar = () => {

    
    const user = localStorage.getItem("userData");
    // console.log(user);
  
    // console.log(user);

    const [User, setUser] = useState(null);

    useEffect(() => {
        setUser(user);
    })

    return (
        <Navbar sticky="top" expand="lg" className="navbar_menu" style={{ backgroundColor: "rgb(243, 219, 185)", fontWeight: "600" }}>
            <Container>
                <Navbar.Brand href="/"><img src={logo} alt='logo' width="85px" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" className=''>
                    <Nav
                        className="me-auto my-2 my-lg-0 mx-auto gap-3 "
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/" className='fs-5 fw-bold'>Home</Nav.Link>
                        <Nav.Link href="/" className='fs-5 fw-bold'>About Us</Nav.Link>
                        <Nav.Link href="/productpage"  className='fs-5 fw-bold'>Products</Nav.Link>
                        <Nav.Link href="/" className='fs-5 fw-bold' >Contact</Nav.Link>
                    </Nav>
                    <Form className="d-flex justify-content-center gap-3">
                        {/* <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        /> */}
                        <Link to="/cartpage"><FiShoppingCart size={25} className='mt-2' color='black' /></Link>

                        {User !== null ? <>
                            <ProfileLogout />
                        </>
                            : <>
                                <button type='button' className=' button'><Link to="/signIn" className="button_link p-1">Sign In</Link></button>
                                <button type='button' className=' button'><Link to="/signUp" className='button_link p-1' >Sign Up</Link></button>
                            </>
                        }
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MenuBar;