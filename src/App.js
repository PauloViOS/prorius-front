import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavBar from "./components/Navbar";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    client
      .get("api/profile")
      .then(function (res) {
        setCurrentUser(true);
      })
      .catch(function (error) {
        setCurrentUser(false);
      });
  }, []);

  function updateForm() {
    let toggleBtn = document.getElementById("toggle-btn");

    registrationToggle
      ? (toggleBtn.innerHTML = "Ir para página de cadastro")
      : (toggleBtn.innerHTML = "Ir para página de Login");
    setRegistrationToggle(!registrationToggle);
  }

  function submitRegistration(e) {
    e.preventDefault();
    client
      .post("api/register", {
        name: name,
        username: username,
        email: email,
        password: password,
      })
      .then(function (res) {
        submitLogin(null, false);
      });
  }

  function submitLogin(e, prevent = true) {
    if (prevent) {
      e.preventDefault();
    }
    client
      .post("api/login", {
        email: email,
        password: password,
      })
      .then(function (res) {
        setCurrentUser(true);
      });
  }

  function submitLogout(e) {
    e.preventDefault();
    client.post("api/logout", { withCredentials: true }).then(function (res) {
      setCurrentUser(false);
    });
  }

  return (
    <div>
      <NavBar
        hasUser={!!currentUser}
        logout={submitLogout}
        changeForm={updateForm}
      />
      {currentUser ? (
        <div className="center">
          <h2>Você está logado!!!</h2>
        </div>
      ) : registrationToggle ? (
        <div className="center">
          <h2>Cadastro</h2>
          <Form onSubmit={(e) => submitRegistration(e)}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Nome de usuário</Form.Label>
              <Form.Control
                type="text"
                placeholder="Insira um nome de usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Endereço de email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Insira um email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Insira uma senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
        </div>
      ) : (
        <div className="center">
          <h2>Login</h2>
          <Form onSubmit={(e) => submitLogin(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Endereço de email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Insira seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
}

export default App;
