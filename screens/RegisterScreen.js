import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { Button, Input, Image, Text } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar'
import { useLayoutEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,updateProfile  } from 'firebase/auth'
import { auth } from '../firebase';



const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageURl, setImageURL] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Login",
            title:'Register',
            headerTitleAlign: 'center',
            
        })
    }, [navigation])

     const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((authUser) => {
            authUser.user.updateProfile({   
                displayName: name,
                photoURL: imageURl ||
                            "https://randomuser.me/api/portraits/men/36.jpg",

            })
        })
        .catch((error) => alert(error.message))
     }

    return (
        <View style={styles.container}>
            <StatusBar style='light' />
            <Text h3 style={{ marginBottom: 50}}>
                Create an Account
            </Text>
            <View style={styles.inputContainer}>
                <Input
                placeholder='Full Name'
                autoFocus
                type='text'
                value={name} 
                onChangeText={text => setName(text)}
                />
                <Input
                placeholder='Email'
                type='text'
                value={email} 
                onChangeText={text => setEmail(text)}
                />
                <Input 
                placeholder='Password' 
                type='password' 
                secureTextEntry 
                value={password} 
                onChangeText={text => setPassword(text)} 
                />
                <Input
                placeholder='Profile Picture URL ( Optional) '
                type='text'
                value={imageURl} 
                onChangeText={text => setImageURL(text)}
                onSubmitEditing={register}
                />
            </View>
            <Button
                raised
                onPress={register}
                title= 'Register'
                containerStyle={styles.button}
            />
        </View>    
        
  )
}



export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderColor: 'white,'
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
})

//<KeyboardAvoidingView behavior='padding' style={styles.container} >
//</KeyboardAvoidingView>