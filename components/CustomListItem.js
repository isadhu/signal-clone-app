import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Avatar, ListItem } from '@rneui/themed';
import { useState } from 'react';
import { collection, query, where, onSnapshot,doc, setDoc, addDoc, serverTimestamp, orderBy } from "firebase/firestore";
import { db,auth } from '../firebase'

const CustomListItem = ({id , chatName, enterChat}) => {
    const [chatMessages, setChatMessages] = useState([])

    useEffect(() => {
       const unsubscribe = onSnapshot(collection(db, 'chats', id, 'messages'), orderBy('timestamp', 'desc'),
       (snapshot) => setChatMessages(
        snapshot.docs.map((doc) => (
             doc.data()
        ))
       ))
       return unsubscribe
    })

    return (
    <ListItem key={id} bottomDivider onPress={ () => enterChat(id, chatName)} >
        <Avatar
            size={32}
            rounded
            source={{ 
                uri: 
                chatMessages?.[0]?.photoURL || 
                "https://randomuser.me/api/portraits/men/36.jpg" }}
        />
        <ListItem.Content>
            <ListItem.Title style={{ fontWeight: "900"}}>
                {chatName}
            </ListItem.Title>
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                {chatMessages?.[0]?.displayName || "sender"}  : {chatMessages?.[0]?.message}
            </ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})