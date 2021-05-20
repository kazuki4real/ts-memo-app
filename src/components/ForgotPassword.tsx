import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import FormControl from '@material-ui/core/FormControl'
import Alert from '@material-ui/lab/Alert'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { sp } from './media'

const Wrapper = styled.div`
  background: rgba(96, 96, 96, 0.297);
  /* color: #3f51b5; */
  padding: 50px 70px;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  border-radius: 12px;
  ${sp`
  padding: 30px 25px;
  `}
`

const EmailWrapper = styled(FormControl)`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Title = styled.h2`
  margin-top: 0;
  font-size: 33px;
  ${sp`
  font-size: 25px;
  `}
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
  /* color: #fff; */
  width: 100%;
  padding: 20px 0;
`

const LabelInput = styled.label`
  font-size: 20px;
  margin-top: 30px;
  margin-bottom: 30px;
`

const BackToLogin = styled.div`
  margin-top: 10px;
  font-size: 20px;
  &:hover {
    opacity: 50%;
  }
`

const ForgotPassword = () => {
  const emailRef = useRef<HTMLInputElement | undefined>()
  const { resetPassword } = useAuth()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      setMessage('')
      setError('')
      setLoading(true)
      await resetPassword(emailRef?.current?.value)
      setMessage('Check your inbox for further instructions')
    } catch {
      setError('Failed to reset password')
    }

    setLoading(false)
  }

  return (
    <>
      <Wrapper>
        <Title>Password Reset</Title>
        {error && (
          <Alert
            severity="error"
            style={{ color: '#f42929', backgroundColor: '#fff' }}
          >
            {error}
          </Alert>
        )}
        {message && (
          <Alert
            severity="success"
            style={{ color: '#00a930', backgroundColor: '#fff' }}
          >
            {message}
          </Alert>
        )}
        <FormField onSubmit={handleSubmit}>
          <EmailWrapper id="email">
            <LabelInput>Registered Email</LabelInput>
            <Field
              type="email"
              label="Email"
              variant="outlined"
              inputRef={emailRef}
              required
            />
          </EmailWrapper>
          <ButtonWrapper>
            <ButtonStyled
              variant="contained"
              // color="primary"
              disabled={loading}
              type="submit"
            >
              Reset Password
            </ButtonStyled>
          </ButtonWrapper>
        </FormField>
        <BackToLogin>
          <Link style={{ color: '#266798' }} to="/login">
            back to Login
          </Link>
        </BackToLogin>
      </Wrapper>
    </>
  )
}

export default ForgotPassword
