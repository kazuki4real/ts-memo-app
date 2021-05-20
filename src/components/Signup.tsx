import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import { WrapSignup } from './Wrapper'
import LinearProgress from '@material-ui/core/LinearProgress'

export const FromSignup = React.createContext<any>(null)

const Signup = () => {
  const emailRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()
  const passwordConfirmRef = useRef<HTMLInputElement>()
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e: React.SyntheticEvent): Promise<void> {
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

  const value = {
    emailRef,
    passwordRef,
    passwordConfirmRef,
    loading,
    error,
    handleSubmit,
  }

  return (
    <div>
      {loading && <LinearProgress /*color="primary"*/ />}
      <FromSignup.Provider value={value}>
        <WrapSignup />
      </FromSignup.Provider>
    </div>
  )
}

export default Signup
