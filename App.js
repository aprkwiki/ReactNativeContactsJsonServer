import { StatusBar, } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, SafeAreaView, Platform } from 'react-native';
import { Surface, Title, TextInput } from 'react-native-paper';
import ModalView from './src/components/ModalView';
import PostCardItem from './src/components/PostCardItem';

// update this url - new_ngrok_host_url/posts"
// const api_baseurl = 'localhost:3000';
const api_baseurl = 'http://3a58-2601-40d-502-3863-5032-3ba-9807-500b.ngrok.io';
const url = `${api_baseurl}/posts`
// const url = `http://cc8b-68-42-112-98.ngrok.io/posts`;

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export default function App() {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [emailAddresses, setEmailAddresses] = useState([]);
  const [postId, setPostId] = useState(0);
  const [loading, setLoading] = useState(false);

  const getPosts = async () => {
    setLoading(true)
    await fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch(e => console.log(e))
    setLoading(false)
  }

  const addPost = (lastName, firstName, phoneNumbers, emailAddresses) => {
    fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        "firstName": firstName,
        "lastName": lastName,
        "phone": phoneNumbers,
        "emailAddresses": emailAddresses,
      })
    }).then((res) => res.json())
      .then(resJson => {
        console.log('post:', resJson)
        resetForm()
      }).catch(e => { console.log(e) })
  }

  const editPost = (contactId, lastName, firstName, phoneNumbers, emailAddresses) => {
    fetch(url + `/${contactId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        "firstName": firstName,
        "lastName": lastName,
        "phoneNumbers": phoneNumbers,
        "emailAddresses": emailAddresses,
      })
    }).then((res) => res.json())
      .then(resJson => {
        console.log('updated:', resJson)
        resetForm()
      }).catch(e => { console.log(e) })
  }

  const deletePost = (postId) => {
    fetch(url + `/${postId}`, {
      method: "DELETE",
      headers,
    }).then((res) => res.json())
      .then(resJson => {
        console.log('delete:', resJson)
        getPosts()
      }).catch(e => { console.log(e) })
  }

  const resetForm = () => {
    setPostId(0)
    setVisible(false);
    setFirstName('')
    setLastName('')
    setPhoneNumbers([]),
    setEmailAddresses([]),
    getPosts()
  }

  const edit = (id, lastName, firstName, phoneNumbers, emailAddresses) => {
    setVisible(true)
    setPostId(id)
    setLastName(lastName)
    setFirstName(firstName)
    setPhoneNumbers(phoneNumbers)
    setEmailAddresses(emailAddresses)
  }

  useEffect(() => {
    getPosts();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Surface style={styles.header}>
        <Title>Contacts</Title>
        <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
          <Text style={styles.buttonText}>Create New</Text>
        </TouchableOpacity>
      </Surface>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id + index.toString()}
        refreshing={loading}
        onRefresh={getPosts}
        renderItem={({ item }) => (
          <PostCardItem
            phoneNumbers={item.phoneNumbers}
            birthDate={item.birthDate}
            firstName={item.firstName}
            lastName={item.lastName}
            emailAddresses={item.emailAddresses}
            onEdit={() => edit(
              item.id, 
              item.lastName, 
              item.firstName,
              item.phoneNumbers,
              item.emailAddresses,
              )}
            onDelete={() => deletePost(item.id)}
          />
        )}
      />
      <ModalView
        visible={visible}
        title="Contact Fields"
        onDismiss={() => setVisible(false)}
        onSubmit={() => {
          if (postId) {
            editPost(
              postId, 
              lastName,  
              firstName,
              phoneNumbers,
              emailAddresses,
              )
          } else {
            addPost(
              lastName, 
              firstName,
              phoneNumbers,
              emailAddresses
              )
          }
        }}
        cancelable
      >
        <TextInput
          label="Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          mode="outlined"
        />
        <TextInput
          label="First Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          mode="outlined"
        />
        {phoneNumbers.map((_phoneNumber, idx) => {
          return (
            <TextInput
              key={idx}
              label={`Phone:${idx}`}
              value={phoneNumbers[idx]}
              onChangeText={
                (text) => setPhoneNumbers(
                  [phoneNumbers[0], text]
                  )
                }
              mode="outlined"
            />
          )
        })
      }
      {emailAddresses.map((_emailAddresses, idx) => {
          return (
            <TextInput
              key={idx}
              label={`Email:${idx}`}
              value={emailAddresses[idx]}
              onChangeText={
                (text) => setEmailAddresses(
                  [emailAddresses[0], text]
                  )
                }
              mode="outlined"
            />
          )
        })
        }
      </ModalView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef',
    justifyContent: 'center',
  },
  header: {
    marginTop: Platform.OS === 'android' ? 24 : 0,
    padding: 16,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'steelblue',
  },
  buttonText: {
    color: 'white'
  },
});
