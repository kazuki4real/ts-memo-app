import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'

const Dashboard: React.FC = () => {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  const handleLogout = async () => {
    setError('')

    try {
      await logout()
      history.push('/login')
    } catch {
      setError('Failed to log out')
    }
  }

  return (
    <>
      <h2>Profile</h2>
      {error && <Alert severity="error">{error}</Alert>}
      <strong>Email:</strong> {currentUser.email}
      <div>
        <Button onClick={handleLogout}>Log Out</Button>
      </div>
    </>
  )
}

export default Dashboard
