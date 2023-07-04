import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function RegistrationForm({
  handleSubmitRegistration,
  name,
  onNameChange,
  username,
  onUsernameChange,
  email,
  onEmailChange,
  password,
  onPasswordChange,
}) {
  return (
    <div>
      <h2>Cadastro</h2>
      <Form onSubmit={(e) => handleSubmitRegistration(e)}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insira seu nome"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Nome de usuário</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insira um nome de usuário"
            value={username}
            onChange={(e) => onUsernameChange(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Endereço de email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Insira um email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Insira uma senha"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </div>
  );
}

export default RegistrationForm;
