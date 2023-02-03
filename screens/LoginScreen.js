import { View, Text, StyleSheet} from 'react-native'
import { Button, Input, Image } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useLayoutEffect, useState } from 'react';
import RegisterScreen from './RegisterScreen';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';


const LoginScreen = ({navigation}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log(authUser)
      if(authUser) {
        navigation.replace("Home")
      }
      return unsubscribe
    })
  },[])

  useLayoutEffect(() => {
        navigation.setOptions({
            title:'Login',
            headerTitleAlign: 'center',
            
        })
    }, [navigation])

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
    .catch((error) => alert(error))
  }


  
  return (
    <View style={styles.container} >
        <StatusBar style='light' />
        <Image
            source={{
                uri: "https://assets.mofoprod.net/network/images/signal_logo.width-250.jpg"
            }}
            style={{ width: 200, height: 200}}
        />
        <View style={styles.inputContainer}>
            <Input
              placeholder='Email'
              autoFocus type='email'
              value={email} 
              onChangeText={text => setEmail(text)}
              />
            <Input 
              placeholder='Password' 
              type='password' 
              secureTextEntry 
              value={password} 
              onChangeText={text => setPassword(text)}
              onSubmitEditing={signIn} 
              />
        </View>
        <Button 
          containerStyle={styles.button} 
          title='Login' 
          onPress={signIn}
          />
        <Button 
          containerStyle={styles.button}
          type="outline" 
          title='Register'
          onPress= {() => navigation.navigate("Regsiter")}
          />
        <View style={{ height: 50 }} />
    </View>
  )
}

const styles = StyleSheet.create({
container:{
  flex:1,
  alignItems:'center',
  justifyContent:'center',
  padding:10,
  backgroundColor:'white,'
},
  inputContainer: {
    marginTop:20,
    width:300,
},
button:{
  width:200,
  marginTop:10,
},

});


export default LoginScreen
