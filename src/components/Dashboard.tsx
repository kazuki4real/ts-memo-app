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
import AddToPhotosSharpIcon from '@material-ui/icons/AddToPhotosSharp'

const ErrorTitle = styled.div`
  cursor: pointer;
  color: #ce1919;
  &:hover {
    opacity: 50%;
    text-decoration: line-through;
  }
`

const UserEmail = styled.span`
  font-size: 35px;
  color: #3f51b5;
  text-decoration: underline;
`

const EmptyError = styled.p`
  color: #ff1919;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  font-size: 25px;
`

const Field = styled(TextField)`
  display: flex;
`
const FieldWrapper = styled.div`
  margin-bottom: 20px;
`

const Form = styled.form``

const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const SubmitBtn = styled(Button)`
  width: 15%;
`
// const Image = styled.img`
//   width: 50%;
//   height: auto;
// `

const Ul = styled.ul`
  padding-left: 0;
`

const EachList = styled.li`
  font-size: 20px;
  list-style: none;
  background: rgba(216, 214, 214, 0.386);
  border-radius: 10px;
  padding: 25px;
  margin: 15px 0;
`

const UrlP = styled.p`
  font-size: 20px;
  &:hover {
    opacity: 50%;
  }
`

const Title = styled.p`
  margin-top: 0;
  text-decoration: underline;
`

const LogoutBtn = styled(Button)`
  font-size: 60px;
`

interface Pass {
  id: string
  errorTitle: string
}

const Dashboard: React.FC = () => {
  const [error, setError] = useState('')
  const [empty, setEmpty] = useState('')
  const [nonUrl, setNonUrl] = useState('')
  const [datas, setData] = useState([])
  const [passedData, setPassedData] = useState<Pass>({ id: '', errorTitle: '' })
  const [open, setOpen] = React.useState(false)
  const [openModal, setOpenModal] = React.useState(false)
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
      // .limit(10)
      .onSnapshot((snapshot: any) => {
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

    if (url.substr(0, 8) !== 'https://') {
      setNonUrl("It's supposed to be a URL")
      return
    }
    setNonUrl('')

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
    setOpenModal(false)
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
    setOpen(true)
    setPassedData({ id, errorTitle })
  }

  const handleClose = () => {
    setOpen(false)
  }

  const OpenModal = () => {
    setOpenModal(true)
  }

  const closeModal = () => {
    setOpenModal(false)
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
          Hello, <UserEmail>{currentUser.email}</UserEmail>
        </p>
        <AddToPhotosSharpIcon
          onClick={OpenModal}
          fontSize="large"
          color="primary"
          style={{ cursor: 'pointer' }}
        />
        <h2>
          <LogoutBtn color="primary" variant="outlined" onClick={handleLogout}>
            <ExitToAppIcon />
            Log Out
          </LogoutBtn>
        </h2>
      </Header>
      {/* <Image src="./image/TodoImage.svg" alt="img" /> */}
      <Dialog
        open={openModal}
        onClose={closeModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <DialogContentText style={{ visibility: 'hidden' }}>
            To subscribe to this website, please enter your email address here.
            We will
          </DialogContentText>
          <Form onSubmit={handleAdd}>
            <FieldWrapper>
              <Field
                fullWidth
                color="primary"
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
                fullWidth
                color="primary"
                id="outlined-basic"
                label="https://..."
                variant="outlined"
                type="text"
                value={url}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUrl(e.currentTarget.value)
                }
              />
              {nonUrl && <EmptyError>{nonUrl}</EmptyError>}
            </FieldWrapper>
            <BtnWrapper>
              <SubmitBtn variant="contained" type="submit">
                Add
              </SubmitBtn>
            </BtnWrapper>
          </Form>
        </DialogContent>
      </Dialog>
      <Ul>
        {datas.map(
          (data: any) =>
            currentUser.uid === data.userId && (
              <EachList key={data.id}>
                <Title>Error Message:</Title>
                <ErrorTitle
                  onClick={() => handleClickOpen(data.id, data.errorTitle)}
                >
                  <p>{data.errorTitle}</p>
                </ErrorTitle>
                <Title>Solution: </Title>
                <a href={data.url} target="_blank" rel="noopener">
                  <UrlP>{data.url}</UrlP>
                </a>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{'Delete'}</DialogTitle>
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
      </Ul>
    </Wrapper>
  )
}

export default Dashboard
