import './App.css';
import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  //Link
} from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  //CardImg
  //UncontrolledDropdown,
  //DropdownToggle,
  //DropdownMenu,
  //DropdownItem
} from "reactstrap"

import Summary from "./pages/Summary";
import DefiKingdoms from "./pages/DefiKingdoms";
import Tranquil from "./pages/Tranquil";
import miniIcon from "./img/logo192.png"

function App() {
  
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className="MainPage">
    <Navbar expand="md" color='light' light fixed="top">
        <NavbarBrand href="/"><img src={miniIcon} alt="icon" height={32}></img> MetricsDAO - Harmony Dashboard</NavbarBrand>
          <NavbarToggler onClick={() => isOpen ? setIsOpen(false) : setIsOpen(true) } />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/" >Harmony-Ecosystem</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/dfk" >Defi-Kingdoms</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/tranquil" >Tranquil-Finance</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://metricsdao.xyz" className='NavigationBar-mdao'>MetricsDAO</NavLink>
              </NavItem>
              {/* <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
            </Nav>
          </Collapse>
        </Navbar>
        <br />
        <br />
        <br />  
    <BrowserRouter>
        <Routes>
          <Route path="/dfk" element={<DefiKingdoms className="SubPage"/>} />
          <Route path="/tranquil" element={<Tranquil className="SubPage"/>} />
          <Route path="/" element={<Summary className="SubPage"/>} />
        </Routes>
    </BrowserRouter>
    </div>
  );
}



export default App;
