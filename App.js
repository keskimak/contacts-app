import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList, Dimensions } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useState } from 'react';


export default function App() {
  const [contact, setContact] = useState([]);

  const getContacts = async () => {

    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {

      const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.PhoneNumbers
        ]
      });

      if (data.length > 0) {
        setContact(data);
      }
    }
  }

  return (<View style={styles.container}>
    <View style={{ flex: 0, marginTop: 50 }}>
      <Text style={{ fontSize: 30 }}>Contacts</Text>

    </View>
    <View style={{ flex: 0, backgroundColor: 'beige', marginTop: 20 }}>
      <Button title="Get Contacts" onPress={getContacts} />
    </View>
    <View>

      <FlatList
        data={contact}
        style={styles.listcont}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) =>
          <Text>{item.name} </Text>
        }

      />

    </View>
  </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    marginBottom: 10



  },
  header: {
    flex: 0.3,

  },
  listcont: {
    flex: 0
  }

});
