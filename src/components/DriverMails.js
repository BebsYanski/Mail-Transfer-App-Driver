import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native'
import axios from 'axios'
import CheckBox from 'expo-checkbox'

const DriverMails = ({ driverId }) => {
  const [mails, setMails] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchMails()
  }, [])

  const fetchMails = async () => {
    try {
      const response = await axios.get(
        `http://192.168.153.56:8080/${driverId}/mails`
      )
      setMails(response.data)
    } catch (error) {
      console.error('Error fetching mails:', error)
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    fetchMails().then(() => setRefreshing(false))
  }

  const handleDeliveryStatusChange = async (mailId, isDelivered) => {
    try {
      await axios.put(`http://192.168.153.56:8080/${mailId}/status`, {
        delivered: isDelivered,
      })
      Alert.alert(
        'Status Updated',
        `Mail ${mailId} marked as ${
          isDelivered ? 'Delivered' : 'Not Delivered'
        }`
      )
      fetchMails() // Refresh the list after status update
    } catch (error) {
      console.error('Error updating delivery status:', error)
      Alert.alert('Error', 'Failed to update delivery status')
    }
  }

  const renderMail = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.content}</Text>
      <Text style={styles.cell}>{item.senderName}</Text>
      <Text style={styles.cell}>{item.recipientName}</Text>
      <Text style={styles.cell}>{item.recipientDestination}</Text>
      {/* <Text style={styles.cell}>{item.cost}</Text> */}
      <CheckBox
        value={item.deliveryStatus === 'DELIVERED'}
        onValueChange={(newValue) =>
          handleDeliveryStatusChange(item.id, newValue)
        }
      />
    </View>
  )

  return (
    <View style={styles.outerContainer}>
      <Text style={styles.header}>Assigned Mails</Text>
      <View style={styles.innerContainer}>
        <View style={styles.row}>
          <Text style={styles.headerCell}>Content</Text>
          <Text style={styles.headerCell}>Sender</Text>
          <Text style={styles.headerCell}>Recipient</Text>
          <Text style={styles.headerCell}>Destination</Text>
          {/* <Text style={styles.headerCell}>Cost</Text> */}
          <Text style={styles.headerCell}>Delivered</Text>
        </View>
        <FlatList
          data={mails}
          renderItem={renderMail}
          keyExtractor={(item) => item.id.toString()}
          onRefresh={handleRefresh}
          refreshing={refreshing}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    minWidth: '100vw',
    marginTop: 20,
  },
  innerContainer: {
    minWidth: '100vw',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: "center",
    textDecoration: 'underline',

  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
})

export default DriverMails
