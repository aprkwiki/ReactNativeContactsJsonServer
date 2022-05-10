import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

const Button = ({ onPress, style, icon }) => (
  <TouchableOpacity style={style} onPress={onPress}>
    <Feather name={icon} size={24} />
  </TouchableOpacity>
)

export default function PostCardItem({ 
  phoneNumbers, 
  firstName,
  lastName,
  birthDate,
  emailAddresses,
  onEdit, onDelete }) {
  return (
    <Card style={styles.item}>
      <View style={styles.rowView}>
        <View>
          <Text style={styles.title}>
            {`${lastName}, ${firstName}`}</Text>
          {/* <Text>Author: {author}</Text> */}
          {phoneNumbers && phoneNumbers[0] &&
            <><Text style={styles.label}>Primary</Text><Text>{phoneNumbers[0]}</Text></>
          }          
          {phoneNumbers && phoneNumbers[1] &&
            <><Text style={styles.label}>Alternative</Text><Text>{phoneNumbers[1]}</Text></>
          }
          {emailAddresses && 
            <><Text style={styles.label}>Email</Text><Text>{emailAddresses[0]}</Text></>
          }
          {birthDate &&
            <><Text style={styles.label}>Birthday</Text><Text>{birthDate.slice(0, 10)}</Text></>
          }
        </View>
        <View style={styles.rowView}>
          <Button
            onPress={onEdit}
            icon="edit"
            style={{ marginHorizontal: 16 }} />
          <Button onPress={onDelete} icon='trash-2' />
        </View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    padding: 16,
    margin: 16,
    elevation: 4,
    borderRadius: 8
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    marginTop: 4, 
    paddingLeft: 0,
    color: "#33a"
  },
})