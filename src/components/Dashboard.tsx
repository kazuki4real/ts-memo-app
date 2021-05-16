import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import { db } from '../firebase'
import styled from 'styled-components'

const DeleteDiv = styled.div`
  cursor: pointer;
`

const Dashboard: React.FC = () => {
  const [error, setError] = useState('')
  const [datas, setData] = useState([])
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  console.log(currentUser)

  type Unsub = () => void

  useEffect(() => {
    const unsubscribe: Unsub = db
      .collection('users')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot: any) => {
        console.log('snapshot is', snapshot)
        const dataSet = snapshot.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setData(dataSet)
      })
    return () => unsubscribe()
  }, [])

  console.log(datas)

  const handleAdd = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (name === '') {
      return
    }

    db.collection('users')
      //IDを自動生成している場合はset()ではなくadd()
      .add({
        name,
        timestamp: Date.now(),
        userId: currentUser.uid,
      })
    setName('')
    setAge('')
  }

  const handleDelete = (id: any) => {
    if (!window.confirm('Are you sure?')) {
      return
    }
    db.collection('users')
      .doc(id)
      .delete()
      .then(() => {
        console.log('success')
      })
      .catch((err) => {
        console.log(err)
      })
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
      <h2>
        Profile: <span>{currentUser.email}</span>
      </h2>
      {error && <Alert severity="error">{error}</Alert>}
      <img src="./image/TodoImage.svg" alt="img" />
      <div>
        <Button onClick={handleLogout}>Log Out</Button>
      </div>
      <form onSubmit={handleAdd}>
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
      <ul>
        {datas.map(
          (data: any) =>
            currentUser.uid === data.userId && (
              <li key={data.id}>
                <div>{data.name}</div>
                <DeleteDiv onClick={() => handleDelete(data.id)}>[x]</DeleteDiv>
              </li>
            ),
        )}
      </ul>
    </>
  )
}

export default Dashboard
