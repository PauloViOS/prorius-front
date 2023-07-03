import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

function NavBar({ hasUser, logout, changeForm }) {
  const handleLogout = (e) => {
    logout(e);
  };

  const handleChangeForm = () => {
    changeForm();
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Prorius</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {hasUser ? (
              <Button
                type="submit"
                variant="light"
                onClick={(e) => handleLogout(e)}
              >
                Sair
              </Button>
            ) : (
              <Button
                id="toggle-btn"
                onClick={handleChangeForm}
                variant="light"
              >
                Ir para página de cadastro
              </Button>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
