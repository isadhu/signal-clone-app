import { StyleSheet, Text, Touchable, TouchableOpacity, View, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect, useState } from 'react'
import {AntDesign, SimpleLineIcons, FontAwesome, Ionicons} from '@expo/vector-icons'
import { Avatar } from '@rneui/themed'
import { collection, query, where, onSnapshot,doc, setDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { auth } from '../firebase';
import { db } from '../firebase'

const ChatScreen = ({navigation, route}) => {
    const [input, setInput] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat',
            headerTitleAlign: 'left',
            headerBackTitleVisible: false,
            headerTitle: () => (
                <View 
                    style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                    }}
                >
                    <Avatar
                        rounded
                        source={{uri:"https://randomuser.me/api/portraits/men/35.jpg" }}
                    />
                    <Text style={{ color:"white", marginLeft: 10, fontWeight: "700" , marginTop: 5}}>
                        {route.params.chatName}
                    </Text>
                </View>
            ),
            headerRight: () => (
               <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 80,
                    marginRight: 20,
               }}>
                <TouchableOpacity>
                    <FontAwesome name='video-camera' size={24} color='white' />
                </TouchableOpacity>
                
                <TouchableOpacity>
                    <Ionicons name='call' size={24} color='white' />
                </TouchableOpacity>
               </View> 
            )          
        })
    }, [navigation])

    console.log(route.params.id)

    const sendMessage = () => {

        Keyboard.dismiss()
        /* 
           db.collection('chats').doc(route.params.id).collection('messages)
           .add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message:  input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
           }) 
        */
       const data = {
        timestamp: serverTimestamp(),
        message:  input,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL        
       }
       const dbRef = collection(db, 'chats')
       
       const docRef = doc(db, route.params.id)

       addDoc(dbRef, data)

       setInput('')
   }

    return (
        <SafeAreaView style={{ flex:1, backgroundColor:'white'}} >
            <StatusBar style='light' />
            <KeyboardAvoidingView
                // behavior={Platform.OS === 'ios' ? "padding" : "height" }
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback>
                    <>
                        <ScrollView>
                            {/* chat goes here*/}
                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput
                                placeholder='Enter message here'
                                style={styles.textInput}
                                value={input} 
                                onChangeText= {(text) => setInput(text)}
                                onSubmitEditing={sendMessage}
                                />          
                            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5} >
                                <Ionicons name='send' size={24} color='#2B68E6' />
                            </TouchableOpacity>          
                        </View>
                    </>
                </ TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%",
        padding: 15,
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        borderColor: 'transparent',
        backgroundColor: '#ECECEC',
        borderWidth: 1,
        padding: 10,
        color: 'grey', 
        borderRadius: 30,
    }
})

//  headerLeft: () => (
//                 <TouchableOpacity>
//                     <AntDesign name="arrowleft" size={24} color="white" />
//                 </TouchableOpacity>
//             )