import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import { db } from '../firebase'

const Dashboard: React.FC = () => {
  const [error, setError] = useState('')
  const [datas, setData] = useState([])
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  type Unsub = () => void

  useEffect(() => {
    const unsubscribe: Unsub = db
      .collection('users')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot: any) => {
        const dataSet = snapshot.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setData(dataSet)
      })
    return () => unsubscribe()
  }, [])

  // console.log(datas);

  const handleInput = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (name === '') {
      return
    }

    db.collection('users')
      //IDを自動生成している場合はset()ではなくadd()
      .add({
        name,
        timestamp: Date.now(),
        age: parseInt(age),
      })
    setName('')
    setAge('')
  }

  async function handleLogout(): Promise<void> {
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
      <ul>
        {datas.map((data: any) => (
          <li key={data.id}>
            <div>{data.name}</div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleInput}>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.currentTarget.value)
            }
          />
        </div>
        <div>
          <input
            type="number"
            value={age}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAge(e.currentTarget.value)
            }
          />
        </div>
        <button type="submit">Add</button>
      </form>
      <div>
        <Button onClick={handleLogout}>Log Out</Button>
      </div>
    </>
  )
}

export default Dashboard
