import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import FormControl from '@material-ui/core/FormControl'
import Alert from '@material-ui/lab/Alert'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const LoginWrapper = styled.div`
  background: rgba(74, 73, 73, 0.399);
  color: rgb(255, 251, 251);
  padding: 50px 70px;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  border-radius: 12px;
`

const EmailWrapper = styled(FormControl)`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const PasswordWrapper = styled(FormControl)`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 50px;
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

const Field = styled(TextField)`
  width: 100%;
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

const LabelInput = styled.label`
  font-size: 20px;
  margin-top: 30px;
  margin-bottom: 30px;
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

const Login = () => {
  const emailRef = useRef<HTMLInputElement | undefined>()
  const passwordRef = useRef<HTMLInputElement | undefined>()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e: React.SyntheticEvent): Promise<void> {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailRef?.current?.value, passwordRef?.current?.value)
      history.push('/')
    } catch {
      setError('Failed to log in')
    }

    setLoading(false)
  }

  return (
    <LoginWrapper>
      <Title>Log In</Title>
      {error && <Alert severity="warning">{error}</Alert>}
      <FormField onSubmit={handleSubmit} autoComplete="off">
        <EmailWrapper>
          <LabelInput>Email</LabelInput>
          <Field
            variant="outlined"
            label="Email"
            type="email"
            inputRef={emailRef}
            required
          />
        </EmailWrapper>
        <PasswordWrapper>
          <LabelInput>Password</LabelInput>
          <Field
            variant="outlined"
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
      </FormField>
      <ForgotPass>
        <Link to="/forgot-password">Forgot Password?</Link>
      </ForgotPass>
      <NewAccount>
        <Link to="/signup" style={{ color: '#fff' }}>
          Create an account
        </Link>
      </NewAccount>
    </LoginWrapper>
  )
}

export default Login
