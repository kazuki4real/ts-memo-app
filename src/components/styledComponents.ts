import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { sp } from './media'

export const ErrorTitle = styled.div`
  cursor: pointer;
  color: #b80000;
  font-weight: 500;
  &:hover {
    opacity: 50%;
    text-decoration: line-through;
  }
`

export const UserEmail = styled.span`
  display: flex;
  font-size: 35px;
  ${sp`
  font-size: 25px;
  width: 100%;
  margin-bottom: 10px;
`}
`

export const EmptyError = styled.p`
  color: #ff1919;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Georgia, serif;
  ${sp`
  align-items: center;
  `}
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  font-size: 25px;
  ${sp`
  justify-content: space-between;
  `}
`

export const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const Field = styled(TextField)`
  display: flex;
`
export const FieldWrapper = styled.div`
  margin-bottom: 20px;
`

export const Btn = styled(Button)`
  width: 100%;
`

export const Form = styled.form``

export const BtnWrapper_2 = styled.div`
  display: flex;
  width: 100%;
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
  /* color: #3f51b5; */
  padding-bottom: 10px;
  margin-top: 15px;
`

export const Ul = styled.ul`
  padding-left: 0;
  margin-top: 0;
  ${sp`
  width: 100%;
  `}
`

export const EachList = styled.li`
  font-size: 20px;
  list-style: none;
  background: rgba(216, 214, 214, 0.386);
  border-radius: 10px;
  padding: 25px;
  margin: 15px 0;
  ${sp`
  width: 100%;
  `}
`

export const UrlP = styled.p`
  font-size: 20px;
  word-break: break-all;
  &:hover {
    opacity: 50%;
  }
`

export const Title = styled.p`
  margin-top: 0;
  /* color: #3f51b5; */
`

export const NothingMsg = styled.p`
  /* color: #3f51b5; */
`

export const LogoutBtn = styled(Button)`
  font-size: 20px;
`

export const DateWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  /* color: #3f51b5; */
`
//------------------------------------------
export const EmailWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`

export const FieldWrapper2 = styled(TextField)`
  width: 100%;
  color: #fff;
`

export const PasswordWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 50px;
`

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
  width: 100%;
  color: #fff;
`

export const ButtonStyled = styled(Button)`
  height: 50px;
  color: #fff;
  width: 100%;
  padding: 20px 0;
`

export const WrapperWrapper2 = styled.div`
  background: rgba(96, 96, 96, 0.297);
  /* color: #3f51b5; */
  padding: 50px 70px;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  border-radius: 12px;
  ${sp`
  padding: 30px 25px;
  background: rgba(195, 209, 213, 0.303);
  `}
`

export const TitleWrapper2 = styled.h2`
  margin-top: 0;
  font-size: 33px;
`

export const FormField = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100%;
`

export const Login = styled.div`
  margin-top: 10px;
  font-size: 15px;
  &:hover {
    opacity: 50%;
  }
`

export const ForgotPass = styled.div`
  padding: 10px;
  text-align: right;
`

export const NewAccount = styled.div`
  margin-top: 10px;
  font-size: 15px;
  &:hover {
    opacity: 50%;
  }
`
