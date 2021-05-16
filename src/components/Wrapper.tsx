import React, { useContext } from 'react'
import { FromLogin } from './Login'
import { FromSignup } from './Signup'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import { Link } from 'react-router-dom'

const EmailWrapper = styled(FormControl)`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Field = styled(TextField)`
  width: 100%;
`

const LabelInput = styled.label`
  font-size: 20px;
  margin-top: 30px;
  margin-bottom: 30px;
`

const PasswordWrapper = styled(FormControl)`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 50px;
`

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
  width: 100%;
  color: #fff;
`

const ButtonStyled = styled(Button)`
  height: 50px;
  color: #fff;
  width: 100%;
  padding: 20px 0;
`

const Wrapper = styled.div`
  background: rgba(74, 73, 73, 0.399);
  color: rgb(255, 251, 251);
  padding: 50px 70px;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  border-radius: 12px;
`

const Title = styled.h2`
  margin-top: 0;
  font-size: 33px;
`

const FormField = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100%;
`

const Login = styled.div`
  margin-top: 10px;
  font-size: 15px;
  &:hover {
    opacity: 50%;
  }
`

const ForgotPass = styled.div`
  padding: 10px;
  text-align: right;
`

const NewAccount = styled.div`
  margin-top: 10px;
  font-size: 15px;
  &:hover {
    opacity: 50%;
  }
`

export const WrapLogin = () => {
  const getFromLogin = useContext(FromLogin)
  // console.log(getEmail.emailRef)

  return (
    <Wrapper>
      <Title>Log In</Title>
      {getFromLogin.error && (
        <Alert severity="warning">{getFromLogin.error}</Alert>
      )}
      <FormField onSubmit={getFromLogin.handleSubmit}>
        <EmailWrapper>
          <LabelInput>Email</LabelInput>
          <Field
            variant="outlined"
            label="Email"
            type="email"
            inputRef={getFromLogin.emailRef}
            required
          />
        </EmailWrapper>
        <PasswordWrapper>
          <LabelInput>Password</LabelInput>
          <Field
            variant="outlined"
            label="Password"
            type="password"
            inputRef={getFromLogin.passwordRef}
            required
          />
        </PasswordWrapper>
        <ButtonWrapper>
          <ButtonStyled
            variant="contained"
            disabled={getFromLogin.loading}
            type="submit"
          >
            Log In
          </ButtonStyled>
        </ButtonWrapper>
      </FormField>
      <ForgotPass>
        <Link to="/forgot-password">Forgot Password?</Link>
      </ForgotPass>
      <NewAccount>
        <Link to="/signup" style={{ color: '#fff' }}>
          Create an account
        </Link>
      </NewAccount>
    </Wrapper>
  )
}

export const WrapSignup = () => {
  const getFromSignup = useContext(FromSignup)
  // console.log(getEmail.emailRef)

  return (
    <>
      <Wrapper>
        <Title>Sign Up</Title>
        {getFromSignup.error && (
          <Alert severity="error">{getFromSignup.error}</Alert>
        )}
        <FormField onSubmit={getFromSignup.handleSubmit}>
          <EmailWrapper>
            <LabelInput>Email</LabelInput>
            <Field
              variant="outlined"
              label="Email"
              type="email"
              inputRef={getFromSignup.emailRef}
              required
            />
          </EmailWrapper>
          <PasswordWrapper>
            <LabelInput>Password</LabelInput>
            <Field
              variant="outlined"
              label="Password"
              type="password"
              inputRef={getFromSignup.passwordRef}
              required
            />
          </PasswordWrapper>
          <PasswordWrapper>
            <LabelInput>Password Confirmation</LabelInput>
            <Field
              variant="outlined"
              label="Password"
              type="password"
              inputRef={getFromSignup.passwordConfirmRef}
              required
            />
          </PasswordWrapper>
          <ButtonWrapper>
            <ButtonStyled
              variant="contained"
              disabled={getFromSignup.loading}
              type="submit"
            >
              Sign Up
            </ButtonStyled>
          </ButtonWrapper>
        </FormField>
        <Login>
          <Link to="/login" style={{ color: '#fff' }}>
            Already have an account?
          </Link>
        </Login>
      </Wrapper>
    </>
  )
}
