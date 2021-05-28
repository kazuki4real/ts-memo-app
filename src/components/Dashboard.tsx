import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert'
import AddToPhotosSharpIcon from '@material-ui/icons/AddToPhotosSharp'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { db } from '../firebase'
import Button from '@material-ui/core/Button'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import {
  Wrapper,
  Header,
  UserEmail,
  LogoutBtn,
  ImageWrapper,
  Image,
  Number,
  EachList,
  NothingMsg,
  Btn,
  BtnWrapper_2,
} from './styledComponents'
import DisplayUl from './DisplayUl'
import TextFieldDialog from './TextFieldDialog'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export const AuthDisplay = React.createContext<any>(null)
export const AuthTextField = React.createContext<any>(null)

const Dashboard: React.FC = () => {
  const [error, setError] = useState('')
  const [empty, setEmpty] = useState('')
  const [count, setCount] = useState<number>(5)
  const [nonUrl, setNonUrl] = useState('')
  const [datas, setData] = useState([])
  const [open, setOpen] = React.useState(false)
  const [openModal, setOpenModal] = React.useState(false)
  const [errorTitle, setErrorTitle] = useState<string | number>('')
  const [url, setUrl] = useState('')
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  type Unsub = () => void

  useEffect(() => {
    const unsubscribe: Unsub = db
      .collection('users')
      .orderBy('timestamp', 'desc')
      .limit(count)
      .onSnapshot((snapshot: any) => {
        const dataSet = snapshot.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setData(dataSet)
      })
    return () => unsubscribe()
  }, [count])

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

  const handleDelete = async (id: string): Promise<void> => {
    await db
      .collection('users')
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

  const handleDeleteAll = (): void => {
    setCount(1000)
    datas.map((data: any) => {
      if (data.userId === currentUser.uid) {
        db.collection('users')
          .doc(data.id)
          .delete()
          .then(() => {
            console.log('success')
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
    setOpen(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const OpenModal = () => {
    setErrorTitle('')
    setNonUrl('')
    setEmpty('')
    setUrl('')
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

  const toDate = (timestamp: number): string => {
    const newDate = new Date(timestamp).toString()
    return newDate.substr(0, 25)
  }

  const CurrentUserData = (id: string): number => {
    const newArray = datas.filter((x: any) => x.userId === id)
    return newArray.length
  }

  const value_displayUi = {
    toDate,
    handleDelete,
    currentUser,
    datas,
  }

  const value_textfieldDialog = {
    closeModal,
    handleAdd,
    handleLogout,
    setErrorTitle,
    setUrl,
    empty,
    nonUrl,
    url,
    openModal,
  }

  return (
    <Wrapper id="wrapper">
      {error && (
        <Alert severity="error" style={{ backgroundColor: '#fff' }}>
          {error}
        </Alert>
      )}
      <Header id="header">
        <UserEmail>
          <AccountCircleIcon fontSize="large" />
          {currentUser.email}
        </UserEmail>
        <AddToPhotosSharpIcon
          onClick={OpenModal}
          fontSize="large"
          // color="primary"
          style={{ cursor: 'pointer' }}
        />
        <LogoutBtn
          /*color="primary"*/ variant="outlined"
          onClick={handleLogout}
        >
          <ExitToAppIcon />
          ログアウト
        </LogoutBtn>
      </Header>
      {window.innerWidth > 1025 && (
        <ImageWrapper>
          <Image src="./image/TodoImage.svg" alt="img" />
        </ImageWrapper>
      )}
      <AuthTextField.Provider value={value_textfieldDialog}>
        <TextFieldDialog />
      </AuthTextField.Provider>
      <Number>表示件数:({CurrentUserData(currentUser.uid)})</Number>
      {CurrentUserData(currentUser.uid) === 0 ? (
        <EachList>
          <NothingMsg>
            メモはありません。追加しておきたいエラーをメモしよう！
          </NothingMsg>
        </EachList>
      ) : (
        <Btn variant="outlined" /*color="primary"*/ onClick={handleClickOpen}>
          表示中のメモ{CurrentUserData(currentUser.uid)}件をすべて削除
        </Btn>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Deleting alert'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ({CurrentUserData(currentUser.uid)})件すべてのメモを削除しますか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteAll} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      {CurrentUserData(currentUser.uid) >= 5 && (
        <BtnWrapper_2>
          <Btn
            variant="outlined"
            // color="primary"
            onClick={() => setCount(count + 5)}
          >
            {'すべてのメモを表示'}
          </Btn>
          <Btn
            variant="outlined"
            /*color="primary"*/ onClick={() => setCount(5)}
          >
            {'上位５件を表示'}
          </Btn>
        </BtnWrapper_2>
      )}
      <AuthDisplay.Provider value={value_displayUi}>
        <DisplayUl />
      </AuthDisplay.Provider>
    </Wrapper>
  )
}

export default Dashboard
