import React, { useContext } from 'react'
import { AuthDisplay } from './Dashboard'
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
              <ErrorTitle onClick={() => getAuthDisplay.handleDelete(data.id)}>
                <p>{data.errorTitle}</p>
              </ErrorTitle>
              <Title>・参考記事: </Title>
              <a href={data.url} target="_blank" rel="noreferrer">
                <UrlP>{data.url}</UrlP>
              </a>
              <DateWrapper>
                <span>{getAuthDisplay.toDate(data.timestamp)}</span>
              </DateWrapper>
            </EachList>
          ),
      )}
    </Ul>
  )
}

export default DisplayUl
