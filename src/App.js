import './App.css';
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import {
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  Button
} from "reactstrap"

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function App() {
  
  
  
  return (
    <>
    <Button
      color="primary"
      onClick={function noRefCheck(){}}
    >
      Open
    </Button>
    <Offcanvas toggle={function noRefCheck(){}}>
      <OffcanvasHeader toggle={function noRefCheck(){}}>
        Offcanvas
      </OffcanvasHeader>
      <OffcanvasBody>
        <strong>
          This is the Offcanvas body.
        </strong>
      </OffcanvasBody>
    </Offcanvas>
  
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
    </>
  );
}



export default App;
