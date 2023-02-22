import { StyleSheet, Text, Touchable, TouchableOpacity, View, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect, useState } from 'react'
import {AntDesign, SimpleLineIcons, FontAwesome, Ionicons} from '@expo/vector-icons'
import { Avatar } from '@rneui/themed'
import { collection, query, where, onSnapshot,doc, setDoc, addDoc, serverTimestamp, orderBy } from "firebase/firestore";
import { db,auth } from '../firebase'

const ChatScreen = ({navigation, route}) => {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])
    

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
                        source={{
                            uri:
                                messages[0]?.data.photoURL ||
                                "https://randomuser.me/api/portraits/men/35.jpg"
                             }}
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
    }, [navigation, messages])


    const sendMessage = () => {

        Keyboard.dismiss()

       const data = {
        timestamp: serverTimestamp(),
        message:  input,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL        
       }

       addDoc(collection(db, 'chats',route.params.id, 'messages'),
       data
       )

       setInput('')
    }

    useLayoutEffect(() => {
       const unsubscribe = onSnapshot(collection(db, 'chats', route.params.id, 'messages'), orderBy('timestamp', 'desc'),
       (snapshot) => setMessages(
        snapshot.docs.map( (doc) => ({
            id: doc.id,
            data: doc.data(),
        }))
       ))
       return unsubscribe
    }, [route])




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
                        <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
                            {
                                messages.map(({ id, data }) => (
                                    data.email === auth.currentUser.email ? (
                                        <View key={id} style={styles.reciever}>
                                            <Avatar 
                                                position='absolute'
                                                bottom={-15}
                                                right={-5}
                                                // WEB
                                                containerStyle={{
                                                    position:'absolute',
                                                    bottom: -15,
                                                    right: -5,
                                                }}
                                                rounded
                                                size={30}
                                                source={{
                                                    uri: data.photoURL,
                                                }} />
                                            <Text style={styles.recieverText}>
                                                {data.message}
                                            </Text>
                                        </View>
                                    ) : (
                                        <View key={id}  style={styles.sender}>
                                            <Avatar 
                                                position='absolute'
                                                bottom={-15}
                                                left={-5}
                                                // WEB
                                                containerStyle={{
                                                    position:'absolute',
                                                    bottom: -15,
                                                    left: -5,
                                                }}
                                                rounded
                                                size={30}
                                                source={{
                                                    uri: data.photoURL,
                                                }} />
                                            <Text style={styles.senderText}>
                                                {data.message}
                                            </Text>
                                            <Text style={styles.senderName}>
                                                {data.displayName}
                                            </Text>
                                        </View>
                                    )))   
                            } 
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
    reciever: {
        padding: 15,
        backgroundColor: '#ECECEC',
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },
    sender: {
        padding: 15,
        backgroundColor: 'blue',
        alignSelf: 'flex-start',
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative",
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: 'white',
    },
    senderText: {
        marginLeft: 10,
        marginBottom: 15,
        fontWeight: "500",
        color: 'white',
    },
    recieverText: {
        marginLeft: 10,
        fontWeight: "500",
        color: 'black',
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














