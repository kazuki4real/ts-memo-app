import React, { useContext } from 'react'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Dialog from '@material-ui/core/Dialog'
import {
  Form,
  FieldWrapper,
  Field,
  EmptyError,
  BtnWrapper,
  SubmitBtn,
} from './styledComponents'
import { AuthTextField } from './Dashboard'

const TextFieldDialog = () => {
  const getAuthTextField = useContext(AuthTextField)

  return (
    <Dialog
      open={getAuthTextField.openModal}
      onClose={getAuthTextField.closeModal}
      aria-labelledby="form-dialog-title"
    >
      <DialogContent style={{ paddingBottom: '20px' }}>
        {window.innerWidth > 1025 ? (
          <DialogContentText style={{ visibility: 'hidden' }}>
            This text means nothing, I just needed to have some space on the
            input. thx.
          </DialogContentText>
        ) : (
          <DialogContentText style={{ visibility: 'hidden' }}>
            This text means nothing, I just needed to have some
          </DialogContentText>
        )}

        <Form onSubmit={getAuthTextField.handleAdd}>
          <FieldWrapper>
            <Field
              fullWidth
              /*color="primary"*/
              id="outlined-basic"
              label="Error Title"
              variant="outlined"
              type="text"
              value={getAuthTextField.errorTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                getAuthTextField.setErrorTitle(e.currentTarget.value)
              }
            />
            {getAuthTextField.empty && (
              <EmptyError>{getAuthTextField.empty}</EmptyError>
            )}
          </FieldWrapper>
          <FieldWrapper>
            <Field
              fullWidth
              /*color="primary"*/
              id="outlined-basic"
              label="https://..."
              variant="outlined"
              type="text"
              value={getAuthTextField.url}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                getAuthTextField.setUrl(e.currentTarget.value)
              }
            />
            {getAuthTextField.nonUrl && (
              <EmptyError>{getAuthTextField.nonUrl}</EmptyError>
            )}
          </FieldWrapper>
          <BtnWrapper>
            <SubmitBtn variant="contained" type="submit">
              Add
            </SubmitBtn>
          </BtnWrapper>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default TextFieldDialog
