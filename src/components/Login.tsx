import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import { WrapLogin } from './Wrapper'
import LinearProgress from '@material-ui/core/LinearProgress'

export const FromLogin = React.createContext<any>(null)

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

  const value = {
    emailRef,
    passwordRef,
    error,
    loading,
    handleSubmit,
  }

  return (
    <div>
      {loading && <LinearProgress /*color="primary"*/ />}
      <FromLogin.Provider value={value}>
        <WrapLogin />
      </FromLogin.Provider>
    </div>
  )
}

export default Login
