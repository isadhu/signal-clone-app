import { Avatar } from '@rneui/themed'
import { signOut } from 'firebase/auth';
import { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {AntDesign, SimpleLineIcons} from '@expo/vector-icons'
import { collection, query, where, onSnapshot,doc, setDoc, addDoc } from "firebase/firestore"; 
import { db } from '../firebase'
import CustomListItem from '../components/CustomListItem'
import { auth } from '../firebase';

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([])

  const signOutUser = () => {
    signOut(auth).then(() => {
      navigation.replace("Login")
    })
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'chats'), ( snapshot => (
      setChats(snapshot.docs.map( doc => ({
        id: doc.id,
        data: doc.data()
      })))
    ))) 

    return unsubscribe
   } , [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Signal',
      headerTitleAlign: 'center',
      headerStyle: { backgroundColor: '#fff'},
      headerTitleStyle: {color : 'black', },
      headerTintColor: 'black',
      headerLeft: () => (
        <View >
          <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
            <Avatar
              rounded
              source={{ uri: auth?.currentUser?.photoURL || 'https://randomuser.me/api/portraits/men/33.jpg' }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: 80,
              marginRight: 20,
              }}>
                <TouchableOpacity activeOpacity={0.5}>
                  <AntDesign name='camerao' size={24} color='black'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => navigation.navigate('AddChat') } activeOpacity={0.5}>
                  <SimpleLineIcons name='pencil' size={24} color='black'/>
                </TouchableOpacity>
        </View>
      ),
    })
  },[navigation])

  const enterChat = (id, chatName) => {
    navigation.navigate('Chat', {
      id: id,
      chatName: chatName,
    })
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {
         chats.map(({id, data: { chatName} }) => (
          <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
         ))
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
  }
})

//'https://randomuser.me/api/portraits/men/33.jpg'