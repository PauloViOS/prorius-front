import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function LoginForm({
  email,
  password,
  handleSubmitLogin,
  onEmailChange,
  onPasswordChange,
}) {
  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={(e) => handleSubmitLogin(e)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Endereço de email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Insira seu email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Senha"
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

export default LoginForm;
