import React from "react";
import FormAuth from "./FormAuth";

function Login({ onLogin }) {
  function handleSubmit(data) {
    onLogin(data);
  }

  return (
    <div className="login content__login">
      <h2 className="login__title">Вход</h2>
      <FormAuth onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;
