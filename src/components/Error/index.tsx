import React from 'react';
import { ErrorData } from '../../hooks/app'
import colors from '../../styles/colors';
import { Container, TextContainer, Title, Description, Icon } from './styles'

type ErrorProps = {
  error: ErrorData
}

const Error: React.FC<ErrorProps> = ({error}) => {
  return (
    <Container>
      <TextContainer>
        <Icon name='alert-circle' color={colors.white} size={48}/>
        <Title>{error.title}</Title>
        <Description>{error.description}</Description>
      </TextContainer>
    </Container>
  )}

export default Error;