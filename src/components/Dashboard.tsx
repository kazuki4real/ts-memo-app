import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import { db } from '../firebase'
import styled from 'styled-components'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import TextField from '@material-ui/core/TextField'

const ErrorTitle = styled.div`
  cursor: pointer;
  &:hover {
    opacity: 50%;
    text-decoration: line-through;
  }
`

const EmptyError = styled.p`
  color: #c10303;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

const Field = styled(TextField)`
  width: 100%;
`
const FieldWrapper = styled.div`
  margin-bottom: 10px;
`

const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const SubmitBtn = styled(Button)`
  width: 15%;
  visibility: none;
`
// const Image = styled.img`
//   width: 50%;
//   height: auto;
// `

const EachList = styled.li`
  font-size: 20px;
`

const LogoutBtn = styled(Button)`
  background-color: #000000;
  font-size: 60px;
`

interface Pass {
  id: string
  errorTitle: string
}

const Dashboard: React.FC = () => {
  const [error, setError] = useState('')
  const [empty, setEmpty] = useState('')
  const [datas, setData] = useState([])
  const [passedData, setPassedData] = useState<Pass>({ id: '', errorTitle: '' })
  const [open, setOpen] = React.useState(false)
  const [errorTitle, setErrorTitle] = useState('')
  const [url, setUrl] = useState('')
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  // console.log(passedId.id, passedId.name)

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
    if (errorTitle === '') {
      setEmpty('Missing error title')
      return
    }

    setEmpty('')
    db.collection('users')
      //IDを自動生成している場合はset()ではなくadd()
      .add({
        errorTitle,
        url,
        timestamp: Date.now(),
        userId: currentUser.uid,
      })
    setErrorTitle('')
    setUrl('')
  }

  const handleDelete = (id: any) => {
    db.collection('users')
      .doc(id)
      .delete()
      .then(() => {
        console.log('success')
      })
      .catch((err) => {
        console.log(err)
      })

    setOpen(false)
  }

  const handleClickOpen = (id: string, errorTitle: any) => {
    console.log(typeof id === 'string')

    setOpen(true)
    setPassedData({ id, errorTitle })
  }

  const handleClose = () => {
    setOpen(false)
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
    <Wrapper>
      {error && <Alert severity="error">{error}</Alert>}
      <Header>
        <p>
          Hello, <span>{currentUser.email}</span>
        </p>
        <h2>
          <LogoutBtn size="large" variant="outlined" onClick={handleLogout}>
            <ExitToAppIcon />
            Log Out
          </LogoutBtn>
        </h2>
      </Header>
      {/* <Image src="./image/TodoImage.svg" alt="img" /> */}
      <form onSubmit={handleAdd}>
        <FieldWrapper>
          <Field
            id="outlined-basic"
            label="Error Title"
            variant="outlined"
            type="text"
            value={errorTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setErrorTitle(e.currentTarget.value)
            }
          />
          {empty && <EmptyError>{empty}</EmptyError>}
        </FieldWrapper>
        <FieldWrapper>
          <Field
            id="outlined-basic"
            label="https://..."
            variant="outlined"
            type="text"
            value={url}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUrl(e.currentTarget.value)
            }
          />
        </FieldWrapper>
        <BtnWrapper>
          <SubmitBtn variant="contained" type="submit">
            Add
          </SubmitBtn>
        </BtnWrapper>
      </form>
      <ul>
        {datas.map(
          (data: any) =>
            currentUser.uid === data.userId && (
              <EachList key={data.id}>
                <ErrorTitle
                  onClick={() => handleClickOpen(data.id, data.errorTitle)}
                >
                  {data.errorTitle}
                </ErrorTitle>
                <a href={data.url} target="_blank" rel="noopener">
                  <p>{data.url}</p>
                </a>
                {/* <DeleteDiv
                  onClick={() => handleClickOpen(data.id, data.errorTitle)}
                >
                  [x]
                </DeleteDiv> */}
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{'DELETE!'}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      You are about to delete...
                    </DialogContentText>
                    "{passedData.errorTitle}"
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button
                      onClick={() => handleDelete(passedData.id)}
                      color="primary"
                      autoFocus
                    >
                      OK
                    </Button>
                  </DialogActions>
                </Dialog>
              </EachList>
            ),
        )}
      </ul>
    </Wrapper>
  )
}

export default Dashboard
