import React from 'react';
import colors from '../../styles/colors';
import { Container, Description, Icon } from './styles';

type ItemListProps = {
  name: string,
  description: string
}

const ItemList: React.FC<ItemListProps> = ({name = 'alert-circle', description='0'}) => {
  return (
    <Container>
      <Icon name={name} color={colors.white} size={16}/>
      <Description>{description}</Description>
    </Container>
  )
 
}

export default ItemList;