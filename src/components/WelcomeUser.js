import React from "react";

function WelcomeUser({ user }) {
  return (
    <div className="center">
      <h2>Você está logado!!!</h2>
      <p>email: {user.email}</p>
      <p>nome: {user.name}</p>
      <p>nome de usuário: {user.username}</p>
    </div>
  );
}

export default WelcomeUser;
