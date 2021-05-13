import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";

const LoginWrapper = styled.div`
  background: rgba(74, 73, 73, 0.399);
  color: rgb(255, 251, 251);
  padding: 30px 70px;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  border-radius: 12px;
  justify-content: space-evenly;
`;

const EmailWrapper = styled(FormControl)`
  width: 30vh;
  display: flex;
  flex-direction: column;
  /* @media (max-width: 930px) {
    width: 250px;
  } */
`;

const PasswordWrapper = styled(FormControl)`
  width: 30vh;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Title = styled.h2`
  margin-top: 0;
  font-size: 33px;
`;

const Field = styled(TextField)`
  width: 100%;
`;

const ButtonWrapper = styled.div`
  margin-top: 40px;
`;

const ButtonStyled = styled(Button)`
  width: 100%;
  height: 45px;
  color: #ddd;
`;

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <LoginWrapper>
      <Title>Log In</Title>
      {error && <Alert severity="warning">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <EmailWrapper id="email">
          <Field
            autoComplete="off"
            label="Email"
            type="email"
            inputRef={emailRef}
            required
          />
        </EmailWrapper>
        <PasswordWrapper id="password">
          <Field
            autoComplete="off"
            label="Password"
            type="password"
            inputRef={passwordRef}
            required
          />
        </PasswordWrapper>
        <ButtonWrapper>
          <ButtonStyled variant="contained" disabled={loading} type="submit">
            Log In
          </ButtonStyled>
        </ButtonWrapper>
      </form>
      <div>
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
      <div>
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </LoginWrapper>
  );
};

export default Login;
