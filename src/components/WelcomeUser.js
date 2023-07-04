import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

function WelcomeUser({ user, updateOnLogout }) {
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
            updateOnLogout();
          })
      );
  }

  return (
    <div className="center">
      <h2>Olá, {user.username}</h2>
      <p>
        <b>Seu email:</b> {user.email}
      </p>
      <p>
        <b>Seu nome:</b> {user.name}
      </p>
      <p>
        <b>Seu nome de usuário:</b> {user.username}
      </p>
      <Button variant="danger" onClick={(e) => deleteProfile(e, user.email)}>
        Deletar meu perfil
      </Button>
    </div>
  );
}

export default WelcomeUser;
