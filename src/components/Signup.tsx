import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import FormControl from '@material-ui/core/FormControl'
import Alert from '@material-ui/lab/Alert'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const SignupWrapper = styled.div`
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
  margin: 20px 0;
`

const Login = styled.div`
  margin-top: 10px;
  font-size: 15px;
  &:hover {
    opacity: 50%;
  }
`

const Signup = () => {
  const emailRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()
  const passwordConfirmRef = useRef<HTMLInputElement>()
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (passwordRef?.current?.value !== passwordConfirmRef?.current?.value) {
      return setError('Passwords do not match')
    }

    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current?.value, passwordRef.current?.value)
      history.push('/')
    } catch {
      setError('Failed to create an account')
    }

    setLoading(false)
  }

  return (
    <SignupWrapper>
      <Title>Sign Up</Title>
      {error && <Alert severity="error">{error}</Alert>}
      <FormField onSubmit={handleSubmit}>
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
        <PasswordWrapper>
          <LabelInput>Password Confirmation</LabelInput>
          <Field
            variant="outlined"
            label="Password"
            type="password"
            inputRef={passwordConfirmRef}
            required
          />
        </PasswordWrapper>
        <ButtonWrapper>
          <ButtonStyled variant="contained" disabled={loading} type="submit">
            Sign Up
          </ButtonStyled>
        </ButtonWrapper>
      </FormField>
      <Login>
        <Link to="/login" style={{ color: '#fff' }}>
          Already have an account?
        </Link>
      </Login>
    </SignupWrapper>
  )
}

export default Signup
