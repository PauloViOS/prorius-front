import React from "react";
import { useState } from "react";
import axios from "axios";

import NavBar from "./components/Navbar";
import WelcomeUser from "./components/WelcomeUser";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import { Container, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  function validatePassword() {
    let lenPassword = password.length;
    let hasSymbol = password.match(/[!@#$%^&*()\[\]{}|;:',<.>\/?_=+-]/);
    let hasNumber = password.match(/\d/);
    if (lenPassword >= 6 && hasSymbol && hasNumber) {
      return true;
    }
    return false;
  }

  function submitRegistration(e) {
    e.preventDefault();
    if (!validatePassword(password)) {
      toast.error(
        "Senha deve ter ao menos 6 dígitos, ao menos um caracter especial e ao menos um número",
        {
          position: "bottom-center",
        }
      );
      return;
    }
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
        let errors = error.response.data;
        if ("email" in errors) {
          toast.error("Já existe um usuário usando este email", {
            position: "bottom-center",
          });
        }
        if ("username" in errors) {
          toast.error("Já existe um usuário usando este nome de usuário", {
            position: "bottom-center",
          });
        }
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
        toast.error(error.response.data[0], {
          position: "bottom-center",
        });
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

  function deleteProfile(e, email) {
    e.preventDefault();
    client
      .delete("api/delete", {
        data: {
          email: email,
        },
      })
      .then(
        client
          .post("api/logout", { withCredentials: true })
          .then(function (res) {
            resetUserAndToggle();
          })
          .then(
            toast.success("Usuário deletado", {
              position: "bottom-center",
            })
          )
      );
  }

  function submitEdition(e, name, email, username, password, currentEmail) {
    e.preventDefault();
    client
      .put("api/update", {
        currentEmail: currentEmail,
        name: name,
        email: email,
        username: username,
        password: password,
      })
      .then(getProfile)
      .catch(function (error) {
        toast.error(error.response.data.message, {
          position: "bottom-center",
        });
      });
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
              handleDelete={deleteProfile}
              handleEdition={submitEdition}
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
      <ToastContainer />
    </div>
  );
}

export default App;
