import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Button, Input } from '@rneui/themed'
import  Icon  from 'react-native-vector-icons/FontAwesome'
import { async } from '@firebase/util'
import { collection, doc, setDoc, addDoc } from "firebase/firestore"; 
import { db } from '../firebase'

const AddChatScreen = ({navigation}) => {
    const [input, setInput] = useState('')

    useLayoutEffect( () => {
        navigation.setOptions({
            title:'Add a new chat',
            headerTitleAlign: 'center',
        })
    },[navigation])

    const createChat = async () => {
        // await collection(db, "chats")
        //     .add({
        //         chatName: input,
        //     })
        //     .then(() => {
        //         navigation.goBack()
        //     })
        //     .catch((error) => alert(error))

       await addDoc(collection(db, 'chats'), {chatName: input,}).then(
                () => navigation.goBack()
       ).
       catch((error) => alert(error))

    }

    return (
        <View style = {styles.container}>
        <Input
            placeholder='Enter a chat name'
            value={input}
            onChangeText= {(text) => setInput(text)}
            leftIcon={
                <Icon name='wechat' type='antdesign' size={24} color='orange' />
            }
        />
        <Button onPress={createChat} title='create new chat'  />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        borderColor: 'white',
        padding: 30,
        height: '100%',
    },
})