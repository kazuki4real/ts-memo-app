import React, { useContext } from 'react'
import { AuthDisplay } from './Dashboard'
import Button from '@material-ui/core/Button'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Dialog from '@material-ui/core/Dialog'
import {
  EachList,
  Title,
  ErrorTitle,
  Ul,
  DateWrapper,
  UrlP,
} from './styledComponents'

const DisplayUl = () => {
  const getAuthDisplay = useContext(AuthDisplay)
  return (
    <Ul>
      {getAuthDisplay.datas.map(
        (data: any) =>
          getAuthDisplay.currentUser.uid === data.userId && (
            <EachList key={data.id}>
              <Title>・エラーメッセージ:</Title>
              <ErrorTitle
                onClick={() =>
                  getAuthDisplay.handleClickOpen(data.id, data.errorTitle)
                }
              >
                <p>{data.errorTitle}</p>
              </ErrorTitle>
              <Title>・参考記事: </Title>
              <a href={data.url} target="_blank" rel="noopener">
                <UrlP>{data.url}</UrlP>
              </a>
              <DateWrapper>
                <span>{getAuthDisplay.toDate(data.timestamp)}</span>
              </DateWrapper>
              <Dialog
                open={getAuthDisplay.open}
                onClose={getAuthDisplay.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{'Delete'}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    You are about to delete...
                  </DialogContentText>
                  "{getAuthDisplay.passedData.errorTitle}"
                </DialogContent>
                <DialogActions>
                  <Button onClick={getAuthDisplay.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button
                    onClick={() =>
                      getAuthDisplay.handleDelete(getAuthDisplay.passedData.id)
                    }
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
  )
}

export default DisplayUl
