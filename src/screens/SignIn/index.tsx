import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'

import { Container, Slogan, Title } from './styles';
import backgroundPng from '../../assets/background.png'

import { Button } from '../../components/Button';

import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from '@env'

WebBrowser.maybeCompleteAuthSession();

export function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
  const [_, response, googleSigIn] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    scopes: ['profile', 'email'],
  })

  function handleGoogleSignIn(){
    setIsAuthenticating(true)

    googleSigIn().then((response) => {
      if(response.type !== 'success'){
        setIsAuthenticating(false)
      }
    })
  }

  useEffect(() => {
    if (response?.type === 'success'){
      if(response.authentication?.idToken){
        console.log('TOKEN DE ACESSO', response.authentication?.idToken)
        fetch(`https://googleapis.com/oauth2/v3/tokeninfo?id_token=${response.authentication?.idToken}`)
        .then(response => response.json())
        .then(console.log)
      } else {
        setIsAuthenticating(false)
        Alert.alert('Entrar', 'Não foi possível conectar-se à sua conta GOOGLE')
      }
    }
  }, [response])

  return (
    <Container source={backgroundPng}>
      <Title>
        Ignite Fleet
      </Title>
      <Slogan>
        Gestão de uso de veículos
      </Slogan>
      <Button 
        title='Entrar com Google'
        onPress={handleGoogleSignIn}
        isLoading={isAuthenticating}
      />
    </Container>
  );
}