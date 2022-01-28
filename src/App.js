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
  CardImg
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
    <>
    <Navbar color="light" light expand="md">
          <NavbarBrand href="/"><img src={miniIcon} height={32}></img> MetricsDAO - Harmony Dashboard</NavbarBrand>
          <NavbarToggler onClick={() => isOpen ? setIsOpen(false) : setIsOpen(true) } />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Summary</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/dfk">Defi-Kingdoms</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/tranquil">Tranquil Finance</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://metricsdao.xyz">MetricsDAO</NavLink>
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
  
    <BrowserRouter>
        <Routes>
          <Route path="/dfk" element={<DefiKingdoms />} />
          <Route path="/tranquil" element={<Tranquil />} />
          <Route path="/" element={<Summary />} />
        </Routes>
    </BrowserRouter>
    </>
  );
}



export default App;
