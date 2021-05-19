import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

export const ErrorTitle = styled.div`
  cursor: pointer;
  color: #ce1919;
  &:hover {
    opacity: 50%;
    text-decoration: line-through;
  }
`

export const UserEmail = styled.span`
  display: flex;

  font-size: 35px;
  color: #3f51b5;
`

export const EmptyError = styled.p`
  color: #ff1919;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Georgia, serif;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  font-size: 25px;
`

export const Field = styled(TextField)`
  display: flex;
`
export const FieldWrapper = styled.div`
  margin-bottom: 20px;
`

export const Form = styled.form``

export const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const SubmitBtn = styled(Button)`
  width: 15%;
`

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const Image = styled.img`
  width: 25%;
  height: auto;
`

export const Number = styled.p`
  margin: 0;
  font-size: 25px;
  color: #3f51b5;
`

export const Ul = styled.ul`
  padding-left: 0;
  margin-top: 0;
`

export const EachList = styled.li`
  font-size: 20px;
  list-style: none;
  background: rgba(216, 214, 214, 0.386);
  border-radius: 10px;
  padding: 25px;
  margin: 15px 0;
`

export const UrlP = styled.p`
  font-size: 20px;
  &:hover {
    opacity: 50%;
  }
`

export const Title = styled.p`
  margin-top: 0;
  color: #3f51b5;
`

export const NothingMsg = styled.p`
  color: #3f51b5;
`

export const LogoutBtn = styled(Button)`
  font-size: 60px;
`

export const DateWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  color: #3f51b5;
`
