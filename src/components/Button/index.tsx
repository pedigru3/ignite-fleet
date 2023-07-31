import { Container, LoadingIndicator, Title } from './styles';
import { TouchableOpacityProps } from 'react-native';

type Props = TouchableOpacityProps & {
  title: string
  isLoading?: boolean
}

export function Button({ isLoading = false, title, ...rest }: Props) {
  return (
    <Container
      activeOpacity={0.7}
      disabled={isLoading}
      {...rest}
    >
      {
        isLoading ?
        <LoadingIndicator/>
        :
        <Title>
          {title}
        </Title>
      }
    </Container>
  );
}