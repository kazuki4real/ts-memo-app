import React, { useContext } from 'react'
import { FromLogin } from './Login'
import { FromSignup } from './Signup'
import Alert from '@material-ui/lab/Alert'
import { Link } from 'react-router-dom'
import {
  EmailWrapper,
  FieldWrapper2,
  PasswordWrapper,
  ButtonWrapper,
  ButtonStyled,
  WrapperWrapper2,
  TitleWrapper2,
  FormField,
  Login,
  ForgotPass,
  NewAccount,
} from './styledComponents'

export const WrapLogin = () => {
  const getFromLogin = useContext(FromLogin)
  // console.log(getEmail.emailRef

  return (
    <WrapperWrapper2 id="asas">
      <TitleWrapper2>Log In</TitleWrapper2>
      {getFromLogin.error && (
        <Alert
          severity="error"
          style={{ color: '#f42929', backgroundColor: '#fff' }}
        >
          {getFromLogin.error}
        </Alert>
      )}
      <FormField onSubmit={getFromLogin.handleSubmit}>
        <EmailWrapper id="emailWrapper">
          <FieldWrapper2
            color="primary"
            variant="outlined"
            label="test@gmail.comで匿名ログイン"
            defaultValue="test@gmail.com"
            type="email"
            inputRef={getFromLogin.emailRef}
            required
          />
        </EmailWrapper>
        <PasswordWrapper>
          <FieldWrapper2
            color="primary"
            variant="outlined"
            label="passwordと入力して匿名ログイン"
            type="password"
            inputRef={getFromLogin.passwordRef}
            required
          />
        </PasswordWrapper>
        <ButtonWrapper>
          {window.innerWidth < 500 ? (
            <ButtonStyled
              variant="contained"
              color="primary"
              disabled={getFromLogin.loading}
              type="submit"
            >
              Log In
            </ButtonStyled>
          ) : (
            <ButtonStyled
              variant="contained"
              disabled={getFromLogin.loading}
              type="submit"
            >
              Log In
            </ButtonStyled>
          )}
        </ButtonWrapper>
      </FormField>
      <ForgotPass>
        <Link style={{ color: '#3f50b5' }} to="/forgot-password">
          Forgot Password?
        </Link>
      </ForgotPass>
      <NewAccount>
        <Link to="/signup" style={{ color: '#3f50b5' }}>
          Create an account
        </Link>
      </NewAccount>
    </WrapperWrapper2>
  )
}

export const WrapSignup = () => {
  const getFromSignup = useContext(FromSignup)
  // console.log(getEmail.emailRef)

  return (
    <>
      <WrapperWrapper2>
        <TitleWrapper2>Sign Up</TitleWrapper2>
        {getFromSignup.error && (
          <Alert
            severity="error"
            style={{ color: '#f42929', backgroundColor: '#fff' }}
          >
            {getFromSignup.error}
          </Alert>
        )}
        <FormField onSubmit={getFromSignup.handleSubmit}>
          <EmailWrapper>
            <FieldWrapper2
              /*color="primary"*/
              variant="outlined"
              label="Email"
              type="email"
              inputRef={getFromSignup.emailRef}
              required
            />
          </EmailWrapper>
          <PasswordWrapper>
            <FieldWrapper2
              /*color="primary"*/
              variant="outlined"
              label="Password"
              type="password"
              inputRef={getFromSignup.passwordRef}
              required
            />
          </PasswordWrapper>
          <PasswordWrapper>
            <FieldWrapper2
              /*color="primary"*/
              variant="outlined"
              label="Password confirmation"
              type="password"
              inputRef={getFromSignup.passwordConfirmRef}
              required
            />
          </PasswordWrapper>
          <ButtonWrapper>
            {window.innerWidth < 500 ? (
              <ButtonStyled
                variant="contained"
                color="primary"
                disabled={getFromSignup.loading}
                type="submit"
              >
                Sign Up
              </ButtonStyled>
            ) : (
              <ButtonStyled
                variant="contained"
                disabled={getFromSignup.loading}
                type="submit"
              >
                Sign Up
              </ButtonStyled>
            )}
          </ButtonWrapper>
        </FormField>
        <Login>
          <Link to="/login" style={{ color: '#3f50b5' }}>
            Already have an account?
          </Link>
        </Login>
      </WrapperWrapper2>
    </>
  )
}
