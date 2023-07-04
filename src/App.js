import React from "react";
import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import NavBar from "./components/Navbar";
import WelcomeUser from "./components/WelcomeUser";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import { Container, Row } from "react-bootstrap";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function updateForm() {
    let toggleBtn = document.getElementById("toggle-btn");

    registrationToggle
      ? (toggleBtn.innerHTML = "Ir para página de cadastro")
      : (toggleBtn.innerHTML = "Ir para página de Login");
    setRegistrationToggle(!registrationToggle);
    setEmail("");
    setName("");
    setUsername("");
    setPassword("");
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
      })
      .catch(function (error) {
        console.log(error.response.data);
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
        getProfile();
        setEmail("");
        setName("");
        setUsername("");
        setPassword("");
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  }

  function submitLogout(e) {
    e.preventDefault();
    client.post("api/logout", { withCredentials: true }).then(function (res) {
      setCurrentUser(null);
      setRegistrationToggle(false);
    });
  }

  function getProfile() {
    client.get("api/profile").then(function (res) {
      setCurrentUser(res.data.profile);
    });
  }

  function resetUserAndToggle() {
    setCurrentUser(null);
    setRegistrationToggle(false);
  }

  return (
    <div>
      <NavBar
        hasUser={!!currentUser}
        logout={submitLogout}
        changeForm={updateForm}
      />
      <Container>
        <Row className="justify-content-center">
          {currentUser ? (
            <WelcomeUser
              user={currentUser}
              updateOnLogout={resetUserAndToggle}
              updateUserInfo={getProfile}
            />
          ) : registrationToggle ? (
            <RegistrationForm
              handleSubmitRegistration={submitRegistration}
              name={name}
              onNameChange={setName}
              username={username}
              onUsernameChange={setUsername}
              email={email}
              onEmailChange={setEmail}
              password={password}
              onPasswordChange={setPassword}
            />
          ) : (
            <LoginForm
              email={email}
              password={password}
              handleSubmitLogin={submitLogin}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
            />
          )}
        </Row>
      </Container>
    </div>
  );
}

export default App;
