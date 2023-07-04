import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

function WelcomeUser({ user, handleDelete, handleEdition }) {
  const [newName, setNewName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  return (
    <div>
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

      <h3 className="mt-5">Formulário para edição do registro</h3>
      <Form
        onSubmit={(e) =>
          handleEdition(
            e,
            newName,
            newEmail,
            newUsername,
            newPassword,
            user.email
          )
        }
      >
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insira um novo nome"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Nome de usuário</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insira um novo nome de usuário"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Endereço de email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Insira um novo email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Insira uma nova senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>

      <h2 className="mt-5">Deletar perfil</h2>
      <Button variant="danger" onClick={(e) => handleDelete(e, user.email)}>
        Deletar meu perfil
      </Button>
    </div>
  );
}

export default WelcomeUser;
